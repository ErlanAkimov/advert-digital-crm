import Sidebar from "../../components/Sidebar/Sidebar";

function Layout({children}) {
    return (
        <div className="App">
            {children}
        </div>
    )
}

export default Layout;