import { FC, useState } from "react";
import { useThinAir } from "../../clients/Thinair/useThinAir";

export const Settings: FC = () => {
    // State
    const [showCheckMark, setShowCheckMark] = useState(false)
    // Mutations
    const apiKeysMutation = useThinAir(['authorize', 'api_keys'], 'POST')
    // Queries
    const apiKeys = useThinAir(['authorize', 'api_keys'], 'GET')
    console.log(apiKeys.data)
    return (
        <></>
    )
}

