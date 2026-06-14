import HomeScreen from "./pages/HomeScreen"
import Loader from "@/components/common/Loader.tsx";

function App() {

    return (
        <div className="mx-auto min-h-screen w-full max-w-480 overflow-x-hidden">
            <Loader />
            <HomeScreen/>

        </div>

    )
}

export default App
