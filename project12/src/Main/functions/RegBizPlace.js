import { domain } from '../../COMMON/ApiDomain';

const API_URL = `${domain}/coolinic/clients/products/bplace?`;

function RegBizPlaceUrl(bizObj) {
  return `${API_URL}bplaceNm=${bizObj.bizNm}
  &bplaceDsc=${bizObj.bizDsc}
  &addr.addressName=${bizObj.addressObj.address_name}
  &addr.region1depthName=${bizObj.addressObj.address.region_1depth_name}
  &addr.region2depthName=${bizObj.addressObj.address.region_2depth_name}
  &addr.region3depthName=${bizObj.addressObj.address.region_3depth_name}
  &addr.region3depthHName=${bizObj.addressObj.address.region_3depth_h_name}
  &addr.hCode=${bizObj.addressObj.address.h_code}
  &addr.bCode=${bizObj.addressObj.address.b_code}
  &addr.mountainYn=${bizObj.addressObj.address.mountain_yn}
  &addr.mainAddressNo=${bizObj.addressObj.address.main_adderss_no}
  &addr.subAddressNo=${bizObj.addressObj.address.sub_adderss_no}
  &addr.zipCode=${bizObj.addressObj.address.zip_code}
  &road.addressName=${bizObj.addressObj.road_address.address_name}
  &road.region1depthName=${bizObj.addressObj.road_address.region_1depth_name}
  &road.region2depthName=${bizObj.addressObj.road_address.region_2depth_name}
  &road.region3depthName=${bizObj.addressObj.road_address.region_3depth_name}
  &road.roadName=${bizObj.addressObj.road_address.road_name}
  &road.undergroundYn=${bizObj.addressObj.road_address.underground_yn}
  &road.mainBuildingNo=${bizObj.addressObj.road_address.main_building_no}
  &road.subBuildingNo=${bizObj.addressObj.road_address.sub_building_no}
  &road.buildingName=${bizObj.addressObj.road_address.building_name}
  &road.zoneNo=${bizObj.addressObj.road_address.zone_no}
  &detail.detailAddr1=${bizObj.addressDsc}
  &latLng.lat=${bizObj.addressObj.y}
  &latLng.lng=${bizObj.addressObj.x}
  `;
}

const regBizPlace = (bizObj) => {
  //console.log("bizObj : ",bizObj);
  //console.log("RegBizPlaceUrl : ",RegBizPlaceUrl(bizObj))
  return fetch(RegBizPlaceUrl(bizObj), {
    method: 'POST',
    headers: {
      "Authorization": "Bearer d84851a8-9396-4a68-bbe7-5a1e5999d05a"
    }
  }).then((response) => response.json()).then((responseJson) => {
    return responseJson;
  }).catch((err) => {
    console.log('ERROR');
    console.log(err);
  });
};

export default regBizPlace;