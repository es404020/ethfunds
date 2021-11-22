

import React from 'react';
import { useRouter } from "next/router";

export default function CampDetails() {

    const router = useRouter();
    const { campid } = router.query;
    return (
        <div>
            {campid}
        </div>
    )
}
