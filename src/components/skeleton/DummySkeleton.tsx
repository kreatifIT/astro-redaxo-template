interface Props {
    amount: number;
}

export default function Dummyskeleton({ amount = 1 }) {
    return (
        <div class="lg:grid lg:grid-cols-2 gap-6 lg:gap-10 items-center xl:gap-[60px] mb-10 opacity-50">
            <div class="aspect-[214/150] bg-gray-200"></div>
            <div class="flex flex-col p-6 gap-6 md:px-0 xl:p-0">
                <div class="h-10 bg-gray-200"></div>
                <div class="h-40 bg-gray-200"></div>
            </div>
        </div>
    );
}
