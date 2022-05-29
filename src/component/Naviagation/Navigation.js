const Navigation = ({onRouteChange, isSignedIn}) => {
    
  if(isSignedIn) {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={()=> onRouteChange("signOut")} className="f3 link dim black underline pa3 pointer">sign out</p>
      </div>
    )
  } else {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={()=> onRouteChange("signIn")} className="f3 link dim black underline pa3 pointer">sign in</p>
        <p onClick={()=> onRouteChange("register")} className="f3 link dim black underline pa3 pointer">Register</p>
      </div>
    )
  }
};
export default Navigation;
