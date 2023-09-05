interface Props {
    success: boolean;
    wildcards?: Map<string, string>;
}

export default function Success({
    success, wildcards
}: Props) {
    if (!success) return null;
    return (
        <div class="text-center bg-primary p-4 text-white font-serif text-lg lg:text-2xl mb-4">
            {wildcards?.get('label.submit_success')}
        </div>
    )
}
