from playwright.sync_api import sync_playwright
R="file:///home/claude/bioglowrxlearning/games/"
with sync_playwright() as p:
    b=p.chromium.launch()
    for lab in ["titration-lab","microscope-lab","syringe-prep","food-test-lab","pulse-lab"]:
        pg=b.new_page(viewport={"width":390,"height":844}); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(R+lab+"/index.html"); pg.wait_for_timeout(500)
        ok=pg.evaluate("""()=>{ BGX.levelUp=()=>{}; const before=BGX.xp.total; const K=BGX.labKit({id:'xptest',title:'T',subject:'chemistry',subjectName:'Chem',tagline:''});
          document.getElementById('br-view').innerHTML='<div id=lab-fb></div>'; K.begin({n:2,title:'x'});
          BGX.reward(true, document.getElementById('lab-fb'));
          K.result({n:3,verdict:'ok',why:'w',levels:[{n:1},{n:2},{n:3}],onLevel(){},onMenu(){}});
          K.result({n:2,verdict:'again',append:true,levels:[{n:1},{n:2},{n:3}],onLevel(){},onMenu(){}});
          return {gain: BGX.xp.total-before, lines: document.querySelectorAll('.lab-xp').length, text: (document.querySelector('.lab-xp')||{}).textContent}; }""")
        print(lab, ok, errs, pg.query_selector("#br-lvl") is not None)
        pg.close()
    b.close()
