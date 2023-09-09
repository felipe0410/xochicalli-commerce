import { FC } from 'react'

import { Card, CardBody, Divider, Skeleton, SkeletonText, Stack } from '@chakra-ui/react'

const ProductCardSkeleton: FC = (): JSX.Element => (
    <Card w='sm' borderRadius='xl'>
        <CardBody>
            <Skeleton
                borderRadius='lg'
                height='256'
            />
            <Stack spacing='3' my='3'>
                <Skeleton noOfLines={1} size={['lg', 'md', 'lg']} />
                <SkeletonText />
                <Divider />
                <Skeleton width='max-content' />
                <SkeletonText noOfLines={2} />
            </Stack>
        </CardBody>
    </Card>
)

export default ProductCardSkeleton