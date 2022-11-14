const util = require("../../util/util");
describe('find mentions', () => {
    describe('when text has 2 mentions', () => {
        it('retrieves 2 email', ()=> {
            const text = "hello @test@test.com and hello @test@moe.edu.sg";
            const result = util.findEmailList(text);
            expect(result.length).toEqual(2);

            expect(result).toContain('test@test.com')
            expect(result).toContain('test@moe.edu.sg')
        })
    })

    describe('when text has 1 invalid mentions', () => {
        it('retrieves no email', () => {
            const text = 'welcome welcome @dfsdgfd';
            const result = util.findEmailList(text);
            expect(result.length).toEqual(0);
        })
    })

    describe('when text has 1 valid mention and 1 invalid mention', () => {
        it('retrieves 1', () => {
            const text = 'welcome @teacher@welcome.com.sg welcome @dfsdgfd';
            const result = util.findEmailList(text);
            expect(result.length).toEqual(1);
            expect(result).toContain('teacher@welcome.com.sg')
        })
    })
})