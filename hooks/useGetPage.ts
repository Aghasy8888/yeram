import { usePathname } from "next/navigation";

const useGetPage = () => {
    const pathname = usePathname();
    const length = pathname.split('/').length;
    const page = pathname.split('/')[length - 1];

    return page;
}

export default useGetPage;