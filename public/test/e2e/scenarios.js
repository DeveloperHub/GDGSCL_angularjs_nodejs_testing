//http://docs.angularjs.org/guide/dev_guide.e2e-testing
//http://www.w3schools.com/jquery/jquery_ref_selectors.asp
//http://pivotal.github.com/jasmine/

'use strict';

var data = [
      {"label": "AnglarJS", "content": "Obsah prvni stranky"},
      {"label": "NodeJS", "content": "Obsah druhe stranky"}
    ];


describe('GDG Spaghetti Code Liberec example app', function () {
  describe('Kontrola HomePage', function () {

    beforeEach(function () {
      browser().navigateTo('../../index.html');
    });

    it('Titulek GDG Spaghetti Code Liberec', function(){
      expect(element('.brand').text()).toBe('GDG Liberec');
    });

    it('Odkaz pro pridani noveho obsahu \"přidat stránku\"', function(){
       expect(element('a:contains("přidat stránku")').text()).toBe('přidat stránku');
    });

  });
  describe('Stranky', function () {

    describe('Kontrola formulare', function () {

      it('Lze přidat novou stranku', function () {
        element('a:contains("přidat stránku")').click();
        expect(element('span:contains("Přidání stránky")').text()).toBe('Přidání stránky');
        input('page.label').enter(data[0].label);
        input('page.content').enter(data[0].content);
        element(":button").click();
      });
      it('Ulozena stranka je v nabidce na hlavni strane', function(){
         expect(element('a:contains("'+data[0].label+'")').text()).toBe(data[0].label);
       });
      it('Editace existujici stranky z AngularJS na NodeJS', function () {
           element('//i[class="icon-pencil"]').click();
           input('page.label').enter(data[1].label);
           input('page.content').enter(data[1].content);
           element(":button").click();
      });
      it('Editace stranky se zdarila', function(){
        expect(element('h1:contains("'+data[1].label+'")').text()).toBe(data[1].label);
        expect(element('//span[ng-bind-html="page.content"]').text()).toBe(data[1].content);
      });
      it('Stranku lze smazat', function(){
         element('a:contains("'+data[1].label+'")').click();
         element('//div[class="btn-group"]/a:last').click();
         expect(element('a:contains("'+data[1].label+'")')).toBe(undefined);
      });
    });

    it('Stranka obsahuje vice jak jednu stranku', function () {
      expect(repeater('ul[class="nav ng-scope"] li').count()).toBeGreaterThan(1);
    });
  });

});