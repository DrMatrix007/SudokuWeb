import React from 'react'

export type IsValidStatsComponentProps = {
    list: Array<{ row: number, col: number, value: number, isValid: boolean }>
}

export default function PlacedStats({ list }: IsValidStatsComponentProps) {
    const succesesPlace = list.filter(step => step.isValid)
    const failsPlace = list.filter(step => !step.isValid)
    const firstSucces  = succesesPlace[0]
    const firstFail = failsPlace.length>0?failsPlace[0]:null;

    return (
        <div>
            <div className='card'>
                <p>other stats</p>
            </div>

        </div>
    )
}
