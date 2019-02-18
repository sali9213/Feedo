import React  from "react";



export const getCustomerFeedbackData = async(url, userid, token) => {
    console.log(url + ' ' + userid + ' ' + token)

    try {
        let response = await fetch(url, {
            method: 'GET',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'UserId': userid,
                'Token': token
            },
        })
        let responseJson = response.json()
        console.log(responseJson)
        return responseJson
      } catch (error) {
        console.error(error);
        return null;
      }
}

// export const fetchData = async() => {

// }