export default function Positions() {
    return(
        <div>
            {/* RELATIVE POSITION */}
            <div id="wd-css-position-relative">
                <h2>Relative</h2>
                <div className="wd-bg-color-gray">
                    <div className="wd-bg-color-yellow 
                                    wd-dimension-portrait">
                    <div className="wd-pos-relative-nudge-down-right">
                        Portrait</div></div>
                    <div className="wd-pos-relative-nudge-up-right 
                        wd-bg-color-blue wd-fg-color-white 
                        wd-dimension-landscape">
                    Landscape</div>
                    <div className="wd-bg-color-red wd-dimension-square">
                    Square</div>
                </div>
            </div>

            {/* ABSOLUTE POSITION */}
            <div id="wd-css-position-absolute">
                <h2>Absolute position</h2>
                <div className="wd-pos-relative">
                    <div className="wd-pos-absolute-10-10 
                        wd-bg-color-yellow wd-dimension-portrait">
                    Portrait</div>
                    <div className="wd-pos-absolute-50-50 
                        wd-bg-color-blue wd-fg-color-white 
                        wd-dimension-landscape">
                    Landscape</div>
                    <div className="wd-pos-absolute-120-20 
                        wd-bg-color-red wd-dimension-square">
                    Square</div>
                </div><br /><br /><br /><br /><br /><br /><br />
            </div>

            {/* FIXED POSITION */}
            <div id="wd-css-position-fixed">
                <h2>Fixed position</h2>
                Checkout the blue square that says "Fixed position" stuck all the way on the right and half way down the page. It doesn't scroll with the rest of the page. Its position is "Fixed".
                <div className="wd-pos-fixed 
                    wd-dimension-square wd-bg-color-blue 
                    wd-fg-color-white">
                    Fixed position
                </div>
            </div>


        </div>
    );
}