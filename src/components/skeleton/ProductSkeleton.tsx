import { Box, Skeleton, SkeletonText, Stack, VStack } from "@chakra-ui/react"

const ProductSkeleton = () => {
    return (
        <Stack direction={['column', 'column', 'row']} gap={[4, 4, 8, 16]} width={[350, 'md', '2xl', '4xl', '6xl']} height='100%'>
            <Box width={[350, 'full', 350, 560]} height={500} bgColor='white' borderRadius='lg' objectFit='cover' boxShadow='base'>
                <Skeleton
                    width={[350, 'full', 350, 500]}
                    height={500}
                    borderRadius='lg'
                />
            </Box>
            <VStack height='100%' width='100%' justifyContent='space-between' boxShadow='base' py={2} px={6} borderRadius='lg'>
                <Box width='full' my={4}>
                    <Skeleton width='full' height={16} />
                    <Skeleton width={75} height={8} my={4} />
                    <SkeletonText width='full' height={8} my={4} noOfLines={5} />
                    <Skeleton mt={4} />
                </Box>
                <Stack direction={['row', 'row', 'column']} py={4} alignItems={['center', 'center', 'flex-start']} justifyContent='space-around' width='full'>
                    <Box border='1px solid' borderColor='gray.200' py={2} px={4} borderRadius='lg'>
                        <Skeleton width={100} height={50} />
                    </Box>
                    <Skeleton width={200} height={50} />
                </Stack>
            </VStack>
        </Stack>
    )
}
export default ProductSkeleton