export default function Flex() {
    return(
        <div>
            <div id="wd-css-flex">
                <h2>Flex</h2>
                <div className="wd-flex-row-container">
                    <div className="wd-bg-color-yellow
                                    wd-width-75px">
                        Column 1
                    </div>
                    <div className="wd-bg-color-blue">Column 2</div>
                    <div className="wd-bg-color-red
                                    wd-flex-grow-1">
                        Column 3
                    </div>
                </div>
            </div>
        </div>
    );
}