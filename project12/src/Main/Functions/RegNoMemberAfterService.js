import { AsyncStorage } from 'react-native'
import { TEST_ACCESS_TOKEN, DOMAIN, INVAILD_TOKEN } from '~/Common/Blend';
import GetAccessToken from '~/Common/Functions/GetAccessToken';

const API_URL = `${DOMAIN}/coolinic/nonusr/as/recv`;

function RegNoMemberAfterServiceUrl() {
  return `${API_URL}`
}

function makeData(asRecvObj) {
  const data = new FormData();

  data.append('nonusrNm', asRecvObj.usrNm);
  data.append('nonusrPhoneNum', asRecvObj.usrPhoneNum);

  if(asRecvObj.addressObj.address !== null) {
    data.append('jibunAddressName', asRecvObj.addressObj.address.address_name);
    data.append('jibunHCode', asRecvObj.addressObj.address.h_code);
    data.append('jibunBCode', asRecvObj.addressObj.address.b_code);
    data.append('jibunMountainYn', asRecvObj.addressObj.address.mountain_yn);
    data.append('jibunMainAddressNo', asRecvObj.addressObj.address.main_adderss_no);
    data.append('jibunSubAddressNo', asRecvObj.addressObj.address.sub_adderss_no);
    data.append('jibunZipCode', asRecvObj.addressObj.address.zip_code);

    data.append('region1depthName', asRecvObj.addressObj.address.region_1depth_name);
    data.append('region2depthName', asRecvObj.addressObj.address.region_2depth_name);
    data.append('region3depthName', asRecvObj.addressObj.address.region_3depth_name);
    data.append('region3depthHName', asRecvObj.addressObj.address.region_3depth_h_name);
  } else {
    // data.append('addr.region1depthName', null);
    // data.append('addr.region2depthName', null);
    // data.append('addr.region3depthHName', null);
    // data.append('addr.hCode', null);
    // data.append('addr.bCode', null);
    // data.append('addr.mountainYn', null);
    // data.append('addr.mainAddressNo', null);
    // data.append('addr.subAddressNo', null);
    // data.append('addr.zipCode', null);
  }

  if(asRecvObj.addressObj.road_address !== null) {
    data.append('roadAddressName', asRecvObj.addressObj.road_address.address_name);
    data.append('roadName', asRecvObj.addressObj.road_address.road_name);
    data.append('roadUndergroundYn', asRecvObj.addressObj.road_address.underground_yn);
    data.append('roadMainBuildingNo', asRecvObj.addressObj.road_address.main_building_no);
    data.append('roadSubBuildingNo', asRecvObj.addressObj.road_address.sub_building_no);
    data.append('roadBuildingName', asRecvObj.addressObj.road_address.building_name);
    data.append('roadZoneNo', asRecvObj.addressObj.road_address.zone_no);
  } else {
    // data.append('road.addressName', null);
    // data.append('road.region1depthName', null);
    // data.append('road.region2depthName', null);
    // data.append('road.region3depthName', null);
    // data.append('road.roadName', null);
    // data.append('road.undergroundYn', null);
    // data.append('road.mainBuildingNo', null);
    // data.append('road.subBuildingNo', null);
    // data.append('road.buildingName', null);
    // data.append('road.zoneNo', null);
  }
  data.append('detailAddr1', asRecvObj.addressDsc);
  data.append('lat', asRecvObj.addressObj.y);
  data.append('lng', asRecvObj.addressObj.x);

  console.log("data - ", data);

  return data;
}

const RegNoMemberAfterService = async (asRecvObj) => {
  
  console.log("asRecvObj : ",asRecvObj);

  return fetch(RegNoMemberAfterServiceUrl(asRecvObj), {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: makeData(asRecvObj)
  }).then((response) => response.json()).then(async (responseJson) => {
    return responseJson;
}).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default RegNoMemberAfterService;