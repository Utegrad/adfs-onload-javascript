///// Begin Company 1 additions /////

// ============== Config selection for domain, companyName and logo ==================

var arr = [

    {domain:"domain1.com", companyName: "Company 1", logo:"domain1.com_260x79.jpg"},
    {domain:"domain2.com", companyName: "Company 2", logo:"domain2.com_260x104.jpg"},
    {domain:"domain3.com", companyName: "Company 3", logo:"domain3.com_230x129.png"},

    ];
    // When add new domain just add one more line to the arr with paramater are: domain, companyName and logo (is the image file name which is store in C:\AdfsTheme\logo)

    //NOTE: lower case for domain text
// ============== Config selection for domain, companyName and logo ==================
// ======= config for default for domain, companyName and logo =============
var defaultDomain = "domain1.com";
var defaultCompanyName = "Company 1";
var defaultLogo = "adfs_260x73.jpg";
var supportPhoneNum = "(888) 555-1212";
// ======= config for default for domain, companyName and logo =============


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setLogoByDomain(domainName){
    // tag for set logo 
    var logoDomain = document.getElementById('header');

    if (logoDomain)
    {
        // logoDomain element is present, modify its properties.
        var logoName;
        var companyName;
		
        for(var i=0;i<arr.length;i++){
            if(arr[i]["domain"] === domainName){
                //console.log(arr[i]["logo"]);
                logoName = arr[i]["logo"];
				companyName = arr[i]["companyName"];
                break;
            }
        } 

        if (logoName){
            // set logo
            logoDomain.innerHTML = "<img class='logoImage' src='/adfs/portal/logo/" + logoName +"' alt='" + domainName + "'" +">"

            // tag for set introduction
            var introductionTag = document.getElementById('introduction');
            if (introductionTag){
                // set introduction
                introductionTag.innerHTML = "<p>Example: username@" + domainName + "<br></p><p><br>For help logging in please call the " + companyName + " IT team at " + supportPhoneNum + " or open a ticket by sending an email to <a href='mailto:support@" + domainName + "'>support@" + domainName + "</a></p>" ;
            }
        }
        else { // set default value

            // set default logo
            logoDomain.innerHTML = "<img class='logoImage' src='/adfs/portal/logo/" + defaultLogo +"' alt='" + defaultDomain + "'" +">"

             // tag for set introduction
            var introductionTag = document.getElementById('introduction');
            if (introductionTag){
                // set default introduction
                introductionTag.innerHTML = "<p>Example: username@" + defaultDomain + "<br></p><p><br>For help logging in please call the IT team at " + supportPhoneNum + " or open a ticket by sending an email to <a href='mailto:support@" + defaultDomain + "'>support@" + defaultDomain + "</a></p>" ;   
            }
        }
    }
}

var whr = getParameterByName('whr').toLowerCase().trim();
var userName = getParameterByName('username').toLowerCase().trim();
var wctx = getParameterByName('wctx').toLowerCase().trim();
//console.log(whr);
//console.log("username " + userName);

if (whr.length>0){
    //console.log("whr= "+ whr);
    var domainName = whr;
    setLogoByDomain(domainName);
}
else if (userName.length>0){
    //console.log("username= "+ userName);
    var domainName = userName.split("@").pop();
    //console.log("domain name from username = "+ domainName);
    setLogoByDomain(domainName);
}
else if (wctx.length>0){
	// this parameter is also in the workflow from outlook.office365.com so it must come after the userName conditional
	// otherwise we have a bug where this sets the domainName value to something other than the domain name
	var domainName = wctx.split('whr=').pop().split('&').shift();
	//console.log("domainName from wctx= "+ domainName);
	setLogoByDomain(domainName);
}

/////  End Company 1 Additions /////
