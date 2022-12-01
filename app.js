$(document).ready(function(){
    $.get( "http://localhost/PHP_REST-API_CRUD/api.php?action=read", function(data) {
        $(".result").html(data);
        $.each(data , function(index, item){ 
          $('tbody').append('<tr><td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.phone + '</td><td>' + item.address + '</td><td>' + item.department + 
          '</td> <td style="text-align: center; width:15%"><a class="btn btn-sm btn-outline-warning mx-1" role="button" href="#" id="editBtn" data-bs-toggle="modal" data-bs-target="#editModal" data-eid="'+item.id+'"><i class="bi bi-eye-fill"></i></a><a class="btn btn-sm btn-outline-danger mx-1" role="button" href="#" id="dltBtn" data-id="'+item.id+'"><i class="bi bi-trash-fill"></i></a></td></tr>');
        });
    });


    $(document).on("click", "#editBtn", function(){
        var id = $(this).data("eid");
        var obj = {eid : id};
        var jsonObj = JSON.stringify(obj);

        $.post("http://localhost/PHP_REST-API_CRUD/api.php?action=detail", jsonObj, function(data) {
            $(".result").html(data);
            $("#id").val(data[0].id);
            $("#name").val(data[0].name);
            $("#phone").val(data[0].phone);
            $("#address").val(data[0].address);
            $("#department").val(data[0].department);
        });
    });


    $("#create").on("click",function(e){
        e.preventDefault();
        var arr = $("#create-form").serializeArray();
        var obj = {};
        for(var i = 0; i < arr.length; i++){
            obj[arr[i].name] = arr[i].value;
        }

        var jsonObj = JSON.stringify(obj);

        $.post("http://localhost/PHP_REST-API_CRUD/api.php?action=create", jsonObj, function(data) {
            $(".result").html(data);
            $("#create-form").trigger("reset");
            location.reload();
        });
    });


    $("#updateBtn").on("click",function(e){
        e.preventDefault();
        var arr = $("#edit-form").serializeArray();
        var obj = {};
        for(var i = 0; i < arr.length; i++){
            obj[arr[i].name] = arr[i].value;
        }

        var jsonObj = JSON.stringify(obj);

        $.post("http://localhost/PHP_REST-API_CRUD/api.php?action=update", jsonObj, function(data) {
            $(".result").html(data);
            location.reload();
        });
    });


    $(document).on("click", "#dltBtn", function(){
        if(confirm("Are You Sure You Want To Delete This?")){
            var id = $(this).data("id");
            var obj = {eid : id};
            var jsonObj = JSON.stringify(obj);

            $.post("http://localhost/PHP_REST-API_CRUD/api.php?action=delete", jsonObj, function(data) {
                $(".result").html(data);
                location.reload();
            });
        }
    });


    $("#search").on("keyup",function(){
        var search_term = $(this).val();
        var obj = {src : search_term};
        var jsonObj = JSON.stringify(obj);
        $("#load-table").html("");

        $.post("http://localhost/PHP_REST-API_CRUD/api.php?action=search", jsonObj, function(data){
            $(".result").html(data);
            $.each(data , function(index, item){ 
                $('tbody').append('<tr><td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.phone + '</td><td>' + item.address + '</td><td>' + item.department + 
                '</td> <td style="text-align: center; width:15%"><a class="btn btn-sm btn-outline-warning mx-1" role="button" href="#" id="editBtn" data-bs-toggle="modal" data-bs-target="#editModal" data-eid="'+item.id+'"><i class="bi bi-eye-fill"></i></a><a class="btn btn-sm btn-outline-danger mx-1" role="button" href="#" id="dltBtn" data-id="'+item.id+'"><i class="bi bi-trash-fill"></i></a></td></tr>');
            });
        });

    });


    $("#queryText").on("keyup",function(){
        var query_term = $(this).val();
        var obj = {sql : query_term};
        var jsonObj = JSON.stringify(obj);
        $("#query-show").html("");

        $.post("http://localhost/PHP_REST-API_CRUD/api.php?action=query", jsonObj, function(data){
            $(".result").html(data);
            $.each(data , function(index, item){ 
                $('#query-show').append(JSON.stringify(item)+'<br>');
            });
        });

    });
});