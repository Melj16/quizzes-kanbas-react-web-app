export default function BootstrapTables() {
    return(
        <div>
            <div id="wd-css-styling-tables">
                <h2>Tables</h2>
                <table className="table">
                    <thead>
                    <tr className="table-dark"><th>Quiz</th><th>Topic</th><th>Date</th><th>Grade</th></tr>
                    </thead>
                    <tbody>
                    <tr className="table-warning"><td>Q1</td><td>HTML</td><td>2/3/21</td><td>85</td></tr>
                    <tr className="table-danger"><td>Q2</td><td>CSS</td><td>2/10/21</td><td>90</td></tr>
                    <tr className="table-primary"><td>Q3</td><td>JavaScript</td><td>2/17/21</td><td>90</td></tr>
                    </tbody>
                    <tfoot>
                    <tr className="table-success"><td colSpan={3}>Average</td><td>90</td></tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}