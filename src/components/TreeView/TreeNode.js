import { useState } from 'react';
import { Checkbox } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TreeNode = ({ node, getOnChange, selected }) => {
    const [childVisible, setChildVisiblity] = useState(false);
    const hasChild = node.children?.length > 0;

    return (
        <li className="d-tree-node border-0" key={node.id}>
            <div className="d-flex d-flex-container" onClick={(e) => setChildVisiblity((visibility) => !visibility)}>
                {hasChild && (
                    <div className={`d-inline d-tree-toggler d-node ${childVisible ? "active" : ""}`}>
                        <FontAwesomeIcon icon="angle-right" />
                    </div>
                )}
                &nbsp;&nbsp;
                <div className="col d-tree-head d-tree-label">
                    <Checkbox
                        checked={selected.some(item => item === node.id)}
                        onChange={event => getOnChange(event.currentTarget.checked, node)}
                        onClick={e => e.stopPropagation()}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        data-testid={`checkbox-${node.id}`}
                    />
                    {node.name}
                </div>
            </div>

            {hasChild && childVisible && (
                <div className="d-tree-content">
                    <ul className="d-flex d-tree-container flex-column">
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