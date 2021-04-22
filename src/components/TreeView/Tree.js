import TreeNode from "./TreeNode";

const Tree = ({ data = [], getOnChange, selected }) => {
    return (
        <div className="d-tree">
            <ul className="d-flex d-tree-container flex-column">
                {data.map((tree) => (
                    <TreeNode node={tree} getOnChange={getOnChange} selected={selected}/>
                ))}
            </ul>
        </div>
    );
}

export default Tree;