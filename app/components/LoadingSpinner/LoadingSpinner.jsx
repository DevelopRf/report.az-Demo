import { PulseLoader } from "react-spinners"
const LoadingSpinner = () => {
    return (
        <div className="loading">
            <PulseLoader color="#353535"
                speedMultiplier={1} />
        </div>
    )
}

export default LoadingSpinner