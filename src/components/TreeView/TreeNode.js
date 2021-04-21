import { useState } from 'react';
import { Checkbox } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tree from './Tree';

const TreeNode = ({ node }) => {
    const [childVisible, setChildVisiblity] = useState(false);
    const [checked, setChecked] = useState(false);
    const hasChild = node.children.length > 0;

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

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
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    {/* <i className={`mr-1 ${node.icon}`}> </i> */}
                    {node.name}
                </div>
            </div>

            {hasChild && childVisible && (
                <div className="d-tree-content">
                    <ul className="d-flex d-tree-container flex-column">
                        <Tree data={node.children} />
                    </ul>
                </div>
            )}
        </li>
    );
}

export default TreeNode;