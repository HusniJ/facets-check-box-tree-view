import { useState } from 'react';
import { Checkbox } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tree from './Tree';

const TreeNode = ({ node, getOnChange, selected }) => {
    const [childVisible, setChildVisiblity] = useState(false);
    const hasChild = node.children?.length > 0;

    const onChecked = (checked, node) => {
        console.log(checked, node);
        getOnChange(checked, node);
    }
    return (
        <li className="d-tree-node border-0">
            <div className="d-flex d-flex-container" onClick={(e) => setChildVisiblity((visibility) => !visibility)}>
                {hasChild && (
                    <div className={`d-inline d-tree-toggler d-node ${childVisible ? "active" : ""}`}>
                        <FontAwesomeIcon icon="angle-right" />
                    </div>
                )}

                <div className="col d-tree-head">
                    <Checkbox
                        checked={selected.some(item => item === node.id)}
                        onChange={event => onChecked(event.currentTarget.checked, node)}
                        onClick={e => e.stopPropagation()}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    {node.name}
                </div>
            </div>

            {hasChild && childVisible && (
                <div className="d-tree-content">
                    <ul className="d-flex d-tree-container flex-column">
                        {/* <Tree data={node.children} onChange={getOnChange} selected={selected} /> */}
                        {
                            node.children.map((tree) => (
                                <TreeNode node={tree} getOnChange={getOnChange} selected={selected} />
                            ))
                        }
                    </ul>
                </div>
            )}
        </li>
    );
}

export default TreeNode;