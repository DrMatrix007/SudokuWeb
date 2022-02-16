import React from 'react';

function mostCommon<T>(arr: T[]) {
    return arr.sort((a, b) => {
        return arr.filter(v => v === a).length - arr.filter(v => v === b).length;
    }).pop();
}
function mostUnCommon<T>(arr: T[]) {
    return arr.sort((a, b) => {
        return arr.filter(v => v === a).length - arr.filter(v => v === b).length;
    })[0];
}

export type IsValidStatsComponentProps = {
    list: Array<{ row: number, col: number, value: number, isValid: boolean }>
}


export default function IsValidStatsComponent(props: IsValidStatsComponentProps) {
    const { list } = props;

    const stats = {
        precentageOfSucces: (100 * (list.filter(step => step.isValid).length) / list.length),
        succeses: list.filter(step => step.isValid).length,
        mostCommonPlaceCol: mostCommon(list.map(step => step.col)),
        mostCommonPlaceRow: mostCommon(list.map(step => step.row)),

        mostUncommonPlaceCol: mostUnCommon(list.map(step => step.col)),
        mostUncommonPlaceRow: mostUnCommon(list.map(step => step.row)),
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <div className='card'>
                            <p>Precentage Of Succes: {stats.precentageOfSucces.toFixed(2)}</p>
                            <p>Count of Succes: {stats.succeses}</p>
                        </div>
                    </td>
                    <td>
                        <div className='card'>
                            <p>Precentage Of Fails: {(100 - stats.precentageOfSucces).toFixed(2)}</p>
                            <p>Count of Fails: {list.length - stats.succeses}</p>

                        </div>
                    </td>
                    <td>
                        <div className='card'>
                            <p>Total Steps: {list.length}</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <div className='card'>
                            <p>most common place: <br />row: {stats.mostCommonPlaceRow}<br />col: {stats.mostCommonPlaceCol}</p>
                            <p>most uncommon place: <br />row: {stats.mostUncommonPlaceRow}<br />col: {stats.mostUncommonPlaceCol}</p>
                        </div>
                    </td>
                </tr>
            </tbody>

        </table>
    );
}
