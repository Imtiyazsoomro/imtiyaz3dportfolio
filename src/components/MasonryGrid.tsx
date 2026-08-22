import MasonryTile, { type Tile } from "@/components/MasonryTile";

interface MasonryGridProps {
  tiles: Tile[];
}

const MasonryGrid = ({ tiles }: MasonryGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[70px] md:auto-rows-[95px] gap-3 md:gap-4 [grid-auto-flow:dense]">
      {tiles.map((tile, index) => (
        <MasonryTile key={tile.id} tile={tile} index={index} />
      ))}
    </div>
  );
};

export default MasonryGrid;
