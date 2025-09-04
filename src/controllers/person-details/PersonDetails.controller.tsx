import React, { use } from 'react'

const PersonDetailsController = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    console.log(id,"PersonId")
    return (
        <div>PersonDetailsController</div>
    )
}

export default PersonDetailsController