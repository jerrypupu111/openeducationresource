$(document).on('ready page:load', function () {

    temp = $("#chapter").children("#chapter_out");
    temp.each(function()
    {
        var parent = $(this);
        var mid = parent.children(".closeThis").children(".connectedSortable");

        var secId = mid[0].id;

        addSortable(secId);
    });

    $( "#chapter" ).sortable({
        placeholder: "ui-state-highlight ui-corner-all", 
        handle: ".chapter-header",
        cancel: ".portlet-toggle",
        update: function( event, ui ) {showList();}
    }).disableSelection;

    addStyle();
});

function addSortable(i){
    $( "#"+i ).sortable({
        connectWith: ".connectedSortable",
        placeholder: "ui-state-highlight-sec",
        update: function( event, ui ) {showList();}
    }).disableSelection();
}

function addStyle(){
    temp  = $(".ui-state-chapter");
    temp.each(function()
    {
        var node = $(this);

        console.log(node.hasClass( "ui-widget" ));
        if(!node.hasClass( "ui-widget" )){
            
            node.addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
            .find( ".chapter-header" )
            .addClass( "ui-widget-header ui-corner-all" )
            .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
        }
    });


    temp  = $(".portlet-toggle");
    temp.each(function()
    {
        var node = $(this);

        if(!node.hasClass( "done" )){
            
            node.addClass( "done" )
            .click(function() {
                var icon = $( this );
                icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
                icon.closest( ".ui-state-chapter" ).find( ".closeThis" ).toggle(500);
            });
        }
    });
}

function showList(){
    temp = $("#chapter").children("#chapter_out");
    datas = [];

    temp.each(function()
    {
        array = [];
        var parent = $(this);
        var ch = parent.children(".chapter-header");
        var mid = parent.children(".closeThis").children(".connectedSortable");
        var sec = mid.children(".ui-state-default");

        array.push(ch.text());

        sec.each(function()
        {
            var son = $(this);

            array.push(son.text());
        });

        datas.push(array);
    });

    for(j = 0; j < datas.length; j++){
        for(i = 0; i < datas[j].length; i++){
            console.log(".."+datas[j][i]);
        }
    }
}


function load(){
    index = 3;
    array=['ch1', '1.1', '1.2', '1.3', '1.4'];

    temp = "<li id=\"chapter_out\" class=\"ui-state-chapter\"><div class=\"chapter-header\">"+array[0]+"</div><div class=\"closeThis\"><ul id=\"section"+index+"\" class=\"connectedSortable\">";

    for(i = 1; i < array.length; i++){ 
        temp += "<li class=\"ui-state-default\">"+array[i]+"</li>";                  
    }
    temp += "</ul><input type=\"button\" onclick=\"addSec("+index+")\" value=\"Add Section\"></div></li>";

    $("#chapter").append(temp);

    $( "#section"+index).sortable({
        connectWith: ".connectedSortable",
        placeholder: "ui-state-highlight-sec",
        update: function( event, ui ) {showList();}
    }).disableSelection();
}

function addSec(i){
    name = $("#id").val();
    $("#"+i).append("<li class=\"ui-state-default\">"+name+"</li>");
}

function addCh(i){
    name = "new chapter";

    $("#chapter").append("<li id=\"chapter_out\" class=\"ui-state-chapter\"><div class=\"chapter-header\">"+name+"</div><div class=\"closeThis\"><ul id=\""+i+"\" class=\"connectedSortable\"></ul><input type=\"button\" onclick=\"addSec("+i+")\" value=\"Add Section\"></div></li>");
    
    addSortable(i);
    addStyle();
}

function go(i){
    window.location = i;
}

function edit(i){
    name = $("#id").val();
    $( i ).children("span").text(name);
}

function del(i){
    $(i).remove();
}