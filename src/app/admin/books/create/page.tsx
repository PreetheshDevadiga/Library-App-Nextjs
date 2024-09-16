import React, { Suspense } from "react";
import { CreateBookForm } from "../../../../components/admin/books/createbook";

export default async function CreatePage() {
    return (
        <>
        <Suspense fallback={<div>Loading...</div>}>
        < CreateBookForm />
        </Suspense>
        </>
    )
}
