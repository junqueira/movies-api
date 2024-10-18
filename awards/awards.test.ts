import 'jest';
import * as request from 'supertest';

const address : string = (<any>global).address;

test('get /awards', () => {
    let expectedResult = {
        "min": [
            {
                "producer": "Joel Silver",
                "interval": 1,
                "previousWin": "1990",
                "followingWin": "1991"
            }
        ],
        "max": [
            {
                "producer": "Matthew Vaughn",
                "interval": 13,
                "previousWin": "2002",
                "followingWin": "2015"
            }
        ]
    }
    return request(address).get('/awards').then(response => {
        expect(response.status                  ).toBe(200);
        expect(response.body.min                ).toBeInstanceOf(Array);
        expect(response.body.max                ).toBeInstanceOf(Array);
        expect(response.body.min[0].interval    ).toBeLessThanOrEqual(response.body.max[0].interval);
        expect(response.body.min[0].producer    ).toBe(expectedResult.min[0].producer    );
        expect(response.body.min[0].interval    ).toBe(expectedResult.min[0].interval    );
        expect(response.body.min[0].previousWin ).toBe(expectedResult.min[0].previousWin );
        expect(response.body.min[0].followingWin).toBe(expectedResult.min[0].followingWin);
        expect(response.body.max[0].producer    ).toBe(expectedResult.max[0].producer    );
        expect(response.body.max[0].interval    ).toBe(expectedResult.max[0].interval    );
        expect(response.body.max[0].previousWin ).toBe(expectedResult.max[0].previousWin );
        expect(response.body.max[0].followingWin).toBe(expectedResult.max[0].followingWin);
    }).catch(fail);
});