import { BiSearch } from "react-icons/bi";
import { useSearchContext } from "@context/searchContext";
import { useRouter } from "next/navigation";

const search = () => {
    const router = useRouter();
    const { query, setQuery } = useSearchContext();
    return (
        <form action="submit">
            <input
                type="text"
                className="search_input max-[768px]:w-full "
                placeholder="Search Destinations"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                className="search_btn"
                type="submit"
                onClick={() => router.push(`/?q=${query}`)}
            >
                <BiSearch />
            </button>
        </form>
    );
};

export default search;
