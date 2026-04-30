function modifyAuthData(authData) {
    var searchParams = new URLSearchParams(document.location.search);
    if (!searchParams.has('adminImpersonate')) { return; }
    authData.impersonateUid = searchParams.get('adminImpersonate');
    
    document.getElementById('impersonationNotice').innerText = "Impersonating: " + authData.impersonateUid;
}

function checkStatus () {
    // Generic name to not give away purpose of this function in public code
    // Used to disable functions while impersonating players (like saving loadout, buying items, etc)
    return false;
}