package controllers;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

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
            return "{\"Error\": \"Unable to list items.  Error code xx.\"}";
        }
    }
}

