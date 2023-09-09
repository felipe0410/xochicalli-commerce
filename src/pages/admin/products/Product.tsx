import { FC } from 'react'

import { useParams } from 'react-router-dom'

const Product: FC = (): JSX.Element => {

    const { id } = useParams();

    return (
        <div>Admin Product: {id}</div>
    )
}

export default Product