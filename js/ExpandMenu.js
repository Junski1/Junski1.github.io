var isMobile = false;
function CheckForMobile()
{
    if(window.matchMedia("only screen and (max-width: 800px)").matches)
        isMobile = true;
    else{
        ExpandMenu();
        isMobile = false;
    }
        
}
function ExpandMenu() 
{
    if(!isMobile)
        return;
        
    var x = document.getElementById("expand");

    if (x.style.display === "block")
        x.style.display = "none";
    else
        x.style.display = "block";
}