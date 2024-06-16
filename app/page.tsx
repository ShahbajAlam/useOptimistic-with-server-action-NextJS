import Form from "@/components/Form";
import fetchLogos from "@/actions/fetchLogos";

export default async function page() {
    const logos = (await fetchLogos()) as {
        _id: string;
        name: string;
        image: string;
    }[];

    return (
        <main className="min-h-screen flex justify-start items-center flex-col py-4">
            <Form data={JSON.stringify(logos || [])} />
        </main>
    );
}
