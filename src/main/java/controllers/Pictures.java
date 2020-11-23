package controllers;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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
}


