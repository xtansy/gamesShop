import ContentLoader from "react-content-loader";

type CardLoadingBlockProps = {
    width: number;
    height: number;
};

const CardLoadingBlock: React.FC<CardLoadingBlockProps> = ({
    width,
    height,
}) => {
    return (
        <ContentLoader
            speed={1}
            width={width}
            height={height}
            viewBox="0 0 298 370"
            backgroundColor="#f7f7f7"
            foregroundColor="#acaaaa"
        >
            <rect x="-4" y="-87" rx="30" ry="30" width="396" height="396" />
            <circle cx="386" cy="229" r="4" />
            <rect x="3" y="394" rx="0" ry="0" width="143" height="20" />
            <rect x="4" y="433" rx="0" ry="0" width="70" height="16" />
            <rect x="-1" y="314" rx="0" ry="0" width="101" height="21" />
            <rect x="1" y="345" rx="0" ry="0" width="68" height="13" />
        </ContentLoader>
    );
};

export default CardLoadingBlock;
