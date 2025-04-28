export default function CancelButton() {
    return (
        <button
            className="bg-red-500 text-white rounded-md p-2 mt-4"
            onClick={() => {
                window.history.back();
            }}>
            Cancel
        </button>
    );
}