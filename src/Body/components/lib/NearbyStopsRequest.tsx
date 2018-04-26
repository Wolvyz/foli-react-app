import axios from 'axios';
import * as lodash from 'lodash';

export default function({lat, lon, radius}) {
    const reqOptions = {
        url: 'https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql',
        method: 'POST',
        data: `{
                stopsByRadius(lat:${lat}, lon:${lon}, radius:${radius}) {
                    edges {
                     node {
                       stop {
                           timezone
                            code
                            name
                              lat
                              lon
                              zoneId
                        }
                      }
                  }
                }
            } `,
        timeout: 8000,
        headers: {'Content-Type': 'application/graphql'}
    };

    const stops = axios.request(reqOptions).then(res => {
        const stopPositions = lodash.get(res, 'data.data.stopsByRadius.edges', []).map(edge => {
            return {
                code: edge.node.stop.code,
                lat: edge.node.stop.lat,
                lon: edge.node.stop.lon,
                name: edge.node.stop.name,
                timeZone: edge.node.stop.timezone,
                zoneId: edge.node.stop.zoneId
            }
        });
        return stopPositions.length > 0 ? stopPositions : []
    }).catch(err => []);
    return stops;
}