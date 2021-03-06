export const ConvertTotalWinRate = (wins, losses) => {
    let winRate;

    if((wins + losses) === 0){
        winRate = 0;
    } else {
        winRate = Math.round( (wins / (wins + losses) * 100) );
    } 
    
    const winAndLose = `${wins}승 ${losses}패`;

    const styleByWinRate = (winRate) => {
        if (winRate >= 60) {
            return {
                color: "#FF0000",
                fontWeight: "bold"
            };
        } else if (winRate >= 50) {
            return {
                color: "#003DF6",
                fontWeight: "bold"
            };
        } else if (winRate >= 40) {
            return {
                color: "#000000"
            };
        } else {
            return {
                color: "#AAAAAA",
                fontWeight: "bold"
            };
        }
    }

    return (
        <>
            {winAndLose}
            (<span style={styleByWinRate(winRate)}>{winRate}%</span>)
        </>
    )
}