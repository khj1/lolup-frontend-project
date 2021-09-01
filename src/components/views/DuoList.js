import React, { useEffect, useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { ConvertTierToKR } from "../../utils/ConvertTierToKR";
import { ConvertRankToNumber } from "../../utils/ConvertRankToNumber";
import { ConvertTotalWinRate } from "../../utils/ConvertTotalWinRate";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Scroll from "./Scroll";

import Moment from "react-moment";
import 'moment/locale/ko';

import '../../css/DuoList.css';
import { API_DOMAIN } from "../../utils/Env";

function DuoList(props) {
    const [List, setList] = useState([]);

    useEffect(() => {
        axios.defaults.baseURL = API_DOMAIN;
        axios.get("/duo", {
            params : {
                position: props.position,
                tier: props.tier
            }
        })
        .then(function (result) {
            return setList(result.data);
        })  
    },[props.position, props.tier])

    const MomentDateChange = (value) => {
        const nowTime = Date.now(),
              startTime = new Date(value);
      
        return <Moment fromNow>{startTime}</Moment>;
    }

    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
      },
      body: {
        fontSize: 14
      }
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
      root: {
        "&:hover": {
          backgroundColor: theme.palette.action.hover
        }
      }
    }))(TableRow);

    const rows = [];

    List.forEach (row => {
      rows.push({
        most: row.most3,
        iconId: 'http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/' + row.iconId + '.png',
        summonerName: row.summonerName,
        opggLink: 'https://www.op.gg/summoner/userName=' + row.summonerName,
        position: '/images/position/' + row.position + '.png',
        tierImg : '/images/tier/' + row.tier + '.png',
        tier: ConvertTierToKR(row.tier),
        rank: ConvertRankToNumber(row.rank),
        totalWinRate: ConvertTotalWinRate(row.win, row.lose),
        latestWinRate: row.latestWinRate,
        desc: row.desc,
        postDate: MomentDateChange(row.postDate)
      });
    })
    return (
        <TableContainer component={Paper} align="center">
          <Table
            className="duoTable"
            aria-label="customized table"
            style={{ width: "1300px" }}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">소환사 이름</StyledTableCell>
                <StyledTableCell align="left">포지션</StyledTableCell>
                <StyledTableCell align="center">티어</StyledTableCell>
                <StyledTableCell align="center">전체 승률</StyledTableCell>
                <StyledTableCell align="center">최근 승률</StyledTableCell>
                <StyledTableCell align="center">선호챔피언</StyledTableCell>
                <StyledTableCell align="center">한줄소개</StyledTableCell>
                <StyledTableCell align="center">등록날짜</StyledTableCell>
                <StyledTableCell align="center">신청하기</StyledTableCell>
                <Scroll/>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.key}>
                    <StyledTableCell align="left">
                        <img src= {row.iconId} style={{ width: '50px', borderRadius: '70%', border: '1px solid silver' }}/> &nbsp;
                        <a href= {row.opggLink} target="_blank" class="summonerName">{row.summonerName}</a>
                    </StyledTableCell>
                    <StyledTableCell align="left"><img src= {row.position} width="30px" /> </StyledTableCell>
                    <StyledTableCell align="left"><img src= {row.tierImg} width="40px"/> {row.tier} {row.rank}</StyledTableCell>
                    <StyledTableCell align="center"> {row.totalWinRate} </StyledTableCell>
                    <StyledTableCell align="center"> {row.latestWinRate} </StyledTableCell>
                    <StyledTableCell align="center">
                        {row.most.map((info) => {
                            const imgUrl = "http://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/"+ info.name + ".png";
                            return <img src={imgUrl} width="40px"/>;
                        })}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.desc}</StyledTableCell>
                    <StyledTableCell align="center">{row.postDate}</StyledTableCell>
                    <StyledTableCell align="center">
                        <img src={'/images/buttons/chat.png'} width="35px"/>
                    </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table> 
        </TableContainer>
    );
}

const TableContainer = styled.div`
    width: 1300px;
    margin: 0 auto;
    @media screen and (max-width: 800px){
        width: 100%,
        overflow-x: auto;
    }
`;

const mapStateToProps = (state) => {
    return {
        position: state.position.value,
        tier: state.tier.value
    }
}

export default connect(mapStateToProps)(DuoList);
