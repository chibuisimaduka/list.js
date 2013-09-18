describe('Parse', function() {

    var list;

    before(function() {
        $('body').append($('<div id="parse-list">\
            <div class="list">\
                <div><span class="name">Jonny</span><span class="born">1986</span></div>\
                <div><span class="name">Jocke</span><span class="born">1985</span></div>\
            </div>\
        </div>'));

        list = new List('parse-list', {
            valueNames: ['name', 'born']
        });
    });

    after(function() {
        $('#parse-list').remove();
    });

    describe('Parse', function() {
        it('should have two items', function() {
            expect(list.items.length).to.equal(2);
            expect(list.items[0].values().name).to.equal("Jonny");
            expect(list.items[1].values().name).to.equal("Jocke");
        });
        it('should add item to parsed list', function() {
            list.add({ name: "Sven", born: 1950 });
            expect(list.items.length).to.equal(3);
            expect(list.items[0].values().name).to.equal("Jonny");
            expect(list.items[1].values().name).to.equal("Jocke");
            expect(list.items[2].values().name).to.equal("Sven");
            expect(list.items[0].values().born).to.equal("1986");
            expect(list.items[2].values().born).to.equal(1950);
            expect($('#parse-list').find('.list div')[2].innerHTML).to.equal('<span class="name">Sven</span><span class="born">1950</span>');
        });
        it('should parsed value always be string while added could be number', function() {
            expect(list.items[0].values().born).to.equal("1986");
            expect(list.items[0].values().born).not.to.equal(1986);
            expect(list.items[2].values().born).not.to.equal("1950");
            expect(list.items[2].values().born).to.equal(1950);
        });
    });
});