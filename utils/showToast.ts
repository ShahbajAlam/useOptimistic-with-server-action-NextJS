import toast from "react-hot-toast";

export default function showToast(message: string) {
    toast.error(message, {
        id: Date.now().toString(),
        position: "top-center",
        duration: 2000,
        style: {
            paddingInline: 16,
            paddingBlock: 8,
            borderRadius: 8,
        },
    });
}
