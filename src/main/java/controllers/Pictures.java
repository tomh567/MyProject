package controllers;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.MediaType;
import java.io.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Path("pictures/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class Pictures {
    @GET
    @Path("topSix")
    public String picturesTopSix() {
        System.out.println("Invoked pictures.picturesTopSix()");
        JSONArray response = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT PictureID, UserID, Date, Comment, Name, ImagePath FROM Pictures");
            ResultSet results = ps.executeQuery();
            while (results.next()==true) {
                JSONObject row = new JSONObject();
                row.put("PictureID", results.getInt(1));
                row.put("UserID", results.getString(2));
                row.put("Date", results.getString(3));
                row.put("Comment", results.getString(4));
                row.put("Name", results.getString(5));
                row.put("ImagePath", results.getString(6));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to list items.  Error code 01.\"}";
        }
    }

    @GET
    @Path("getPost")
    public String getPost(@CookieParam("token") String token) {
        try {
            JSONArray postArray = new JSONArray();
            PreparedStatement ps1 =Main.db.prepareStatement("SELECT UserID FROM Users WHERE Token = ?");
            ps1.setString(1, token);
            ResultSet rs1 = ps1.executeQuery();

            PreparedStatement ps2 = Main.db.prepareStatement("" +
                    "SELECT Pictures.ImagePath, Users.Username " +
                    "JOIN Pictures ON Users.UserID = Pictures.UserID " +
                    "FROM Pictures  " +
                    "WHERE Pictures.UserID = ?");
            
            ps2.setInt(1, rs1.getInt(1));
            ResultSet rs2 = ps2.executeQuery();
            
            while (rs2.next()) {
                JSONObject postObject = new JSONObject();
                postObject.put("username", rs2.getString(1));
                postObject.put("image", rs2.getString(2));
                postArray.add(postObject);
            }
            return postArray.toString();
        } catch(SQLException exception) {
            return "{\"Error\": \"Unable to get username.  Error code 11.\"}";
        }
    }

    @POST
    @Path("image")
    public String userImage(@CookieParam("token") Cookie sessionCookie, @FormDataParam("file") InputStream uploadedInputStream,
                            @FormDataParam("file") FormDataContentDisposition fileDetail, @FormDataParam("date") String date, @FormDataParam("comment") String comment, @FormDataParam("name") String name) throws Exception {
        
        System.out.println("Invoked User.userImage()");

        String fileName = fileDetail.getFileName();  //file name submitted through form
        int dot = fileName.lastIndexOf('.');            //find where the . is to get the file extension
        String fileExtension = fileName.substring(dot + 1);   //get file extension from fileName
        String newFileName = "client/img/" + UUID.randomUUID() + "." + fileExtension;  //create a new unique identifier for file and append extension

        int userID = validateSessionCookie(sessionCookie);  //validate UUID sent from browser to get userID
        if (userID == -1) {
            return "Error:  Could not validate user";
        }

        PreparedStatement statement = Main.db.prepareStatement("INSERT INTO Pictures(Date, Comment, Name, ImagePath) VALUES (?,?,?,?)");
        statement.setString(1, date);
        statement.setString(2, comment);
        statement.setString(3, name);
        statement.setString(4, newFileName);
        statement.executeUpdate();

        String uploadedFileLocation = "C:\\Users\\92563\\IdeaProjects\\MyProject\\resources\\" + newFileName;

        try {
            int read = 0;
            byte[] bytes = new byte[1024];
            OutputStream out = new FileOutputStream(new File(uploadedFileLocation));
            while ((read = uploadedInputStream.read(bytes)) != -1) {
                out.write(bytes, 0, read);
            }
            out.flush();
            out.close();
            System.out.println("File uploaded to server and imageLink saved to database");
            return "File uploaded to server and imageLink saved to database";

        } catch (IOException e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            return "{\"Error\": \"Something as gone wrong.  Please contact the administrator with the error code UC-UI. \"}";
        }


    }

    public static int validateSessionCookie(Cookie sessionCookie) {     //returns the userID that of the record with the cookie value

        String token = sessionCookie.getValue();
        System.out.println("Invoked User.validateSessionCookie(), cookie value " + token);

        try {
            PreparedStatement statement = Main.db.prepareStatement(
                    "SELECT UserID FROM Users WHERE Token = ?"
            );
            statement.setString(1, token);
            ResultSet resultSet = statement.executeQuery();
            System.out.println("userID is " + resultSet.getInt("UserID"));
            return resultSet.getInt("UserID");  //Retrieve by column name  (should really test we only get one result back!)
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return -1;  //rogue value indicating error

        }
    }


}



