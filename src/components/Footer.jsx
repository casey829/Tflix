import React from "react";


function Footer() {
   return (
    <div className="py-8 mt-auto text-center text-white">
    <footer>
        <p>
        &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
    </footer>
    </div>
   )
};


export default Footer;