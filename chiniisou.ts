namespace Chiniisou {
    enum Suit {
        Characters,
        Bomboos   ,
        Dots
    }
        
    enum TileSize {
        Small ,
        Medium,
        Large
    }

    class Helper {
        public static isFromJapan(): boolean {
            let language: string | null = (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language;
            return language != null && language.substr(0, 2) === 'ja';
        }

        public static save(key: string, data: any): boolean {
            if (typeof window.localStorage !== 'undefined') {
                // console.log('Helper.save()');
                // console.log(data);
                // console.log(JSON.stringify(data));
                window.localStorage.setItem(key, JSON.stringify(data));
                return true;
            } else {
                return false;
            }
        }
            
        public static load(key: string): any | null {
            if (typeof window.localStorage !== 'undefined') {
                const json = window.localStorage.getItem(key);
                // console.log('Helper.load()');
                // console.log(json);
                // if (json != null)
                //     console.log(JSON.parse(json));
                return json == null ? null : JSON.parse(json);
            } else {
                return null;
            }
        }
            
        // public static removeFromStorage(key: string): boolean {
        //     if (typeof window.localStorage !== 'undefined') {
        //         window.localStorage.removeItem(key);
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }

        public static getRandomNumber(minimum: number, maximum: number): number {
            return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        }
        
        public static getRandomIndex(number: number): number {
            return Math.floor(Math.random() * number);
        }
        
        public static getRandomElement<TElement>(array: TElement[]): TElement {
            return array[Helper.getRandomIndex(array.length)];
        }

        public static arrayEquals<TElement>(array1: TElement[], array2: TElement[]): boolean {
            if (array1.length != array2.length)
                return false;
            for (var index = 0; index < array1.length; index++) {
                if (array1[index] !== array2[index])
                    return false;
            }
            return true;
        }

        public static shuffle<TElement>(array: TElement[]): void {
            for (var count = array.length; count > 1; count--)
                Helper.shuffleTail(array, count);
        }

        private static shuffleTail<TElement>(collection: TElement[], count: number): void {
            let lastIndex   = count - 1;
            let randomIndex = Helper.getRandomIndex(count);
            Helper.swap<TElement>(collection, lastIndex, randomIndex);
        }

        private static swap<TElement>(collection: TElement[], index1: number, index2: number): void {
           if (index1 == index2)
               return;
           let temporary      = collection[index1];
           collection[index1] = collection[index2];
           collection[index2] = temporary         ;
        }
    }

    class Model {
        private static readonly completeHandsNumber = 14;

        private allHands     : number[][];
        private completeHands: number[][];
        
        public constructor() {
            this.allHands      = Model.getAllHands();
            this.completeHands = Model.getCompleteHands(this.allHands);
        }

        public getNewReadyToWinHand(): number[] {
            let completeHand = Helper.getRandomElement(this.completeHands);
            return Model.getReadyToWinHand(completeHand);
        }
        
        public static makeComplateHandIndexes(readyToWinHand: number[]): number[] {
            var handIndexes: number[] = [];
            for (var handIndex = 0; handIndex < 9; handIndex++) {
                const hand = Model.appendHand(readyToWinHand, handIndex);
                if (hand !== null && Model.isCompleteHand(hand))
                    handIndexes.push(handIndex);                
            }
            return handIndexes;
        }

        public static shuffledHandIndexes(hand: number[]): number[] {
            let handIndexes = Model.handToHandIndexes(hand);
            Helper.shuffle(handIndexes);
            return handIndexes;
        }

        private static handToHandIndexes(hand: number[]): number[] {
            var handIndexes: number[] = [];

            for (var handIndex = 0; handIndex < hand.length; handIndex++) {
                for (var index = 0; index < hand[handIndex]; index++)
                    handIndexes.push(handIndex);
            }
            return handIndexes;
        }

        // private static handIndexesToHand(handIndexes: number[]): number[] {
        //     var hand: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

        //     for (var index = 0; index < handIndexes.length; index++)
        //         hand[handIndexes[index]]++;
        //     return hand;
        // }

        private static getAllHands(): number[][] {
            var hands = [];
            for (var tileNumber1 = 0; tileNumber1 <= 4; tileNumber1++) {
                let tileNumberSum1 = tileNumber1;
                for (var tileNumber2 = 0; tileNumber2 <= 4; tileNumber2++) {
                    let tileNumberSum2 = tileNumberSum1 + tileNumber2;
                    for (var tileNumber3 = 0; tileNumber3 <= 4; tileNumber3++) {
                        let tileNumberSum3 = tileNumberSum2 + tileNumber3;
                        for (var tileNumber4 = 0; tileNumber4 <= 4; tileNumber4++) {
                            let tileNumberSum4 = tileNumberSum3 + tileNumber4;
                            if (tileNumberSum4 >= Model.completeHandsNumber) {
                                if (tileNumberSum4 == Model.completeHandsNumber)
                                    hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, 0, 0, 0, 0, 0]);
                                break;
                            }
                            for (var tileNumber5 = 0; tileNumber5 <= 4; tileNumber5++) {
                                let tileNumberSum5 = tileNumberSum4 + tileNumber5;
                                if (tileNumberSum5 >= Model.completeHandsNumber) {
                                    if (tileNumberSum5 == Model.completeHandsNumber)
                                        hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, 0, 0, 0, 0]);
                                    break;
                                }
                                for (var tileNumber6 = 0; tileNumber6 <= 4; tileNumber6++) {
                                    let tileNumberSum6 = tileNumberSum5 + tileNumber6;
                                    if (tileNumberSum6 >= Model.completeHandsNumber) {
                                        if (tileNumberSum6 == Model.completeHandsNumber)
                                            hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, tileNumber6, 0, 0, 0]);
                                        break;
                                    }
                                    for (var tileNumber7 = 0; tileNumber7 <= 4; tileNumber7++) {
                                        let tileNumberSum7 = tileNumberSum6 + tileNumber7;
                                        if (tileNumberSum7 >= Model.completeHandsNumber) {
                                            if (tileNumberSum7 == Model.completeHandsNumber)
                                                hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, tileNumber6, tileNumber7, 0, 0]);
                                            break;
                                        }
                                        for (var tileNumber8 = 0; tileNumber8 <= 4; tileNumber8++) {
                                            let tileNumberSum8 = tileNumberSum7 + tileNumber8;
                                            if (tileNumberSum8 >= Model.completeHandsNumber) {
                                                if (tileNumberSum8 == Model.completeHandsNumber)
                                                    hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, tileNumber6, tileNumber7, tileNumber8, 0]);
                                                break;
                                            }
                                            for (var tileNumber9 = 0; tileNumber9 <= 4; tileNumber9++) {
                                                let tileNumberSum9 = tileNumberSum8 + tileNumber9;
                                                if (tileNumberSum9 >= Model.completeHandsNumber) {
                                                    if (tileNumberSum9 == Model.completeHandsNumber)
                                                        hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, tileNumber6, tileNumber7, tileNumber8, tileNumber9]);
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return hands;
        }
        
        private static isSevenPairs(hand: number[]): boolean {
            for (var index = 0; index < hand.length; index++) {
                if (hand[index] != 0 && hand[index] != 2)
                    return false;
            }
            return true;
        }
        
        private static maybeCompleteHand(hand: number[]): boolean {
            var a = hand[0];
            var b = hand[1];
        
            for (var i = 0; i < 7; i++) {
                let r = a % 3;
                if (b >= r && hand[i+2] >= r) {
                    a = b - r;
                    b = hand[i + 2] - r;
                } else {
                    return false;
                }
            }
            return a % 3 == 0 && b % 3 == 0;
        }
        
        private static isCompleteHand(hand: number[]): boolean {
            if (Model.isSevenPairs(hand))
                return true;
        
            var p = 0;
            for (var i = 0; i < 9; i++)
                p += i * hand[i];
        
            for (var i = p * 2 % 3; i < 9; i+=3) {
                hand[i] -= 2;
        
                if (hand[i] >= 0) {
                    if (Model.maybeCompleteHand(hand)) {
                        hand[i] += 2;
                        return true;
                    }
                }
                hand[i] += 2;
            }
            return false;
        }
        
        private static getCompleteHands(allHands: number[][]): number[][] {
            return allHands.filter(hand => Model.isCompleteHand(hand));
        }

        private static decrementHand(hand: number[]): [number[], number] {
            const randomIndex = Helper.getRandomIndex(Model.completeHandsNumber);
            var index = 0;
            for (var handIndex = 0; handIndex < hand.length; handIndex++) {
                index += hand[handIndex];
                if (index > randomIndex) {
                    var clonedHand: number[] = hand.concat();
                    if (clonedHand[handIndex] == 0)
                        throw new Error('Error: decrementHand failed.');
                    else
                        clonedHand[handIndex]--;
                    return [clonedHand, handIndex];
                }
            }
            throw new Error('Error: decrementHand failed.');
        }
        
        private static getReadyToWinHand(completeHand: number[]): number[] {
            return Model.decrementHand(completeHand)[0];
        }
        
        private static appendHand(hand: number[], handIndex: number): number[] | null {
            var clonedHand: number[] = hand.concat();
            if (clonedHand[handIndex] < 4) {
                clonedHand[handIndex]++;
                return clonedHand;
            }
            return null;
        }
    }

    class ViewSettings {
        private static readonly dataKey = 'ShosChiniisouViewSettings';

        private _isJapanese : boolean  = Helper.isFromJapan();
        private _fontOrImage: boolean  = true;
        private _suit       : Suit     = Suit.Characters;
        private _tileSize   : TileSize = TileSize.Medium;
        private _isSorted   : boolean  = true;

        public get isJapanese(): boolean {
            return this._isJapanese;
        }
        public set isJapanese(value: boolean) {
            if (value != this._isJapanese) {
                this._isJapanese = value;
                this.save();
            }
        }

        public get fontOrImage(): boolean {
            return this._fontOrImage;
        }
        public set fontOrImage(value: boolean) {
            if (value != this._fontOrImage) {
                this._fontOrImage = value;
                this.save();
            }
        }

        public get suit(): Suit {
            return this._suit;
        }
        public set suit(value: Suit) {
            if (value != this._suit) {
                this._suit = value;
                this.save();
            }
        }

        public get tileSize(): TileSize {
            return this._tileSize;
        }
        public set tileSize(value: TileSize) {
            if (value != this._tileSize) {
                this._tileSize = value;
                this.save();
            }
        }

        public get isSorted(): boolean {
            return this._isSorted;
        }
        public set isSorted(value: boolean) {
            if (value != this._isSorted) {
                this._isSorted = value;
                this.save();
            }
        }

        // public constructor() {
        //     //Helper.removeFromStorage(ViewSettings.dataKey);
        // }

        public load(): boolean {
            const loadedData = Helper.load(ViewSettings.dataKey);
            if (loadedData == null)
                return false;
            this._isJapanese  = loadedData._isJapanese ;
            this._fontOrImage = loadedData._fontOrImage;
            this._suit        = loadedData._suit       ;
            this._tileSize    = loadedData._tileSize   ;
            this._isSorted    = loadedData._isSorted   ;
            return true;
        }

        private save(): boolean {
            return Helper.save(ViewSettings.dataKey, this);
        }
    }

    class View {
        private static readonly charactersTileTexts = [ '&#x1f007;', '&#x1f008;', '&#x1f009;', '&#x1f00a;', '&#x1f00b;',  '&#x1f00c;',  '&#x1f00d;',  '&#x1f00e;',  '&#x1f00f;'];
        private static readonly bambooTileTexts     = [ '&#x1f010;', '&#x1f011;', '&#x1f012;', '&#x1f013;', '&#x1f014;',  '&#x1f015;',  '&#x1f016;',  '&#x1f017;',  '&#x1f018;'];
        private static readonly dotsTileTexts       = [ '&#x1f019;', '&#x1f01a;', '&#x1f01b;', '&#x1f01c;', '&#x1f01d;',  '&#x1f01e;',  '&#x1f01f;',  '&#x1f020;',  '&#x1f021;'];

        private settings_: ViewSettings = new ViewSettings();

        public get settings(): ViewSettings {
            return this.settings_;
        }

        public constructor() {
            this.settings.load();
        }

        public appendHandTo(element: JQuery<HTMLElement>, hand: number[]): void {
            const div = this.settings.isSorted ? this.handToTileHtml(hand) : this.handIndexesToHtml(Model.shuffledHandIndexes(hand));
            element.append(div);
        }
        
        public appendHandIndexesTo(element: JQuery<HTMLElement>, handIndexes: number[]): void {
            const div = this.handIndexesToHtml(handIndexes);
            element.append(div);
        }

        private get tileStyle(): string {
            switch (this.settings.tileSize) {
                case TileSize.Small : return "small-tile" ;
                case TileSize.Medium: return "medium-tile";
                case TileSize.Large : return "large-tile" ;
            }
        }

        private get tileTexts(): string[] {
            switch (this.settings.suit) {
                case Suit.Bomboos: return View.bambooTileTexts    ;
                case Suit.Dots   : return View.dotsTileTexts      ;
                default          : return View.charactersTileTexts;
            }
        }

        private handIndexesToHtml(handIndexes: number[]): JQuery<HTMLElement> {
            let div = $('<div>');
            div.addClass(this.tileStyle);
            handIndexes.forEach(handIndex => div.append(this.handIndexToHtml(handIndex)));
            return div;
        }

        private handToTileHtml(hand: number[]): JQuery<HTMLElement> {
            let div = $('<div>');
            div.addClass(this.tileStyle);
            hand.forEach((tileNumber, handIndex, self) => {
                for (var count = 0; count < tileNumber; count++)
                    div.append(this.handIndexToHtml(handIndex));
            });
            return div;
        }
        
        private handIndexToHtml(handIndex: number): JQuery<HTMLElement> {
            return this.settings.fontOrImage ? this.toFontHtml(handIndex) : this.toImageHtml(handIndex)
        }

        private toFontHtml(handIndex: number): JQuery<HTMLElement> {
            return $('<span>').html(this.tileTexts[handIndex]);
        }

        private toImageHtml(handIndex: number): JQuery<HTMLElement> {
            var rate = 1.00;
            switch (this.settings.tileSize) {
                case TileSize.Small : rate = 0.75; break;
                case TileSize.Medium: rate = 1.00; break;
                case TileSize.Large : rate = 1.50; break;
            }

            const width  = 47;
            const height = 63;

            return $('<img >').attr('src'   , this.getFontImageFileName(handIndex))
                              .attr('width' , Math.floor(width  * rate)           )
                              .attr('height', Math.floor(height * rate)           );
        }

        private getFontImageFileName(handIndex: number): string {
            var fileName = 'images/p_';
            switch (this.settings.suit) {
                case Suit.Characters: fileName += 'm'; break;
                case Suit.Dots      : fileName += 'p'; break;
                case Suit.Bomboos   : fileName += 's'; break;
            }
            return fileName + 's' + String(handIndex + 1) + '_1.gif';
        }
    }

    export class Application {
        model         : Model    = new Model();
        view          : View     = new View();

        isQuestion    : boolean  = true;
        readyToWinHand: number[] = [];
        questionNumber: number   = 0;
        winsNumber    : number   = 0;

        private get qustionText(): string {
            return this.view.settings.isJapanese ? '聴牌' : 'Ready to win hand';
        }

        private get answerText(): string {
            return this.view.settings.isJapanese ? '待ち' : 'Winning tiles';
        }

        public constructor() {
            this.initializeControls();
            this.setHandlers();
            this.setQuestion();

            this.view.settings.isJapanese ? $('input:radio[name="language"]').val(['japanese'])
                                          : $('input:radio[name="language"]').val(['english' ]);
            this.updateLanguage();
        }

        private initializeControls(): void {
            $('input:radio[name="language"]').val([this.view.settings.isJapanese ? "japanese" : "english"]);

            $('input:radio[name="fontOrImage"]').val([this.view.settings.fontOrImage ? "font" : "image"]);

            var suitValue = "";
            switch (this.view.settings.suit) {
                case Suit.Characters: suitValue = "characters"; break;
                case Suit.Dots      : suitValue = "dots"      ; break;
                case Suit.Bomboos   : suitValue = "bomboos"   ; break;
            }
            //console.log("suitValue: " + suitValue);
            $('input:radio[name="usingTile"]').val([suitValue]);

            var tileSizeValue = "";
            switch (this.view.settings.tileSize) {
                case TileSize.Small : tileSizeValue = "small" ; break;
                case TileSize.Medium: tileSizeValue = "medium"; break;
                case TileSize.Large : tileSizeValue = "large" ; break;
            }
            //console.log("tileSizeValue: " + tileSizeValue);
            $('input:radio[name="tileSize"]').val([tileSizeValue]);

            $('input:radio[name="sorting"]').val([this.view.settings.isSorted ? "sorted" : "unsorted"]);
        }

        private setHandlers(): void {
            $('input:radio[name="language"]').change(() => {
                const value = $('input:radio[name="language"]:checked').val();
                switch (value) {
                    case "japanese": this.view.settings.isJapanese = true ; break;
                    case "english" : this.view.settings.isJapanese = false; break;
                }
                this.updateLanguage();
            });

            $('input:radio[name="fontOrImage"]').change(() => {
                const value = $('input:radio[name="fontOrImage"]:checked').val();
                switch (value) {
                    case "font" : this.view.settings.fontOrImage = true ; break;
                    case "image": this.view.settings.fontOrImage = false; break;
                }
            });

            $('input:radio[name="usingTile"]').change(() => {
                const value = $('input:radio[name="usingTile"]:checked').val();
                switch (value) {
                    case "characters": this.view.settings.suit = Suit.Characters; break;
                    case "dots"      : this.view.settings.suit = Suit.Dots      ; break;
                    case "bomboos"   : this.view.settings.suit = Suit.Bomboos   ; break;
                }
            });

            $('input:radio[name="tileSize"]').change(() => {
                const value = $('input:radio[name="tileSize"]:checked').val();
                switch (value) {
                    case "small" : this.view.settings.tileSize = TileSize.Small ; break;
                    case "medium": this.view.settings.tileSize = TileSize.Medium; break;
                    case "large" : this.view.settings.tileSize = TileSize.Large ; break;
                }
            });

            $('input:radio[name="sorting"]').change(() => {
                const value = $('input:radio[name="sorting"]:checked').val();
                switch (value) {
                    case "sorted"  : this.view.settings.isSorted = true ; break;
                    case "unsorted": this.view.settings.isSorted = false; break;
                }
            });
        
            $('#nextButton').on('click', () => {
                this.isQuestion ? this.setQuestion()
                                : this.setAnswer  ();
                this.updateQandA();
            });

            $('#answerChecksClear').on('click', () => {
                this.clearAnswerChecks();
            });
        }

        private setQuestion(): void {
            this.readyToWinHand = this.model.getNewReadyToWinHand();

            $("#hands").html("");
            $("#hands").append('<div>' + this.qustionText + ':</div>');
            this.view.appendHandTo($("#hands"), this.readyToWinHand);

            this.isQuestion = false;
        }

        private setAnswer(): void {
            const handIndexes = Model.makeComplateHandIndexes(this.readyToWinHand);

            $("#hands").append('<div>' + this.answerText + ':</div>');
            this.view.appendHandIndexesTo($("#hands"), handIndexes);

            this.isQuestion = true;
            this.judge(handIndexes);
        }

        private judge(correctHandIndexes: number[]) {
            const usersAnswerHandIndexes = this.getHandIndexes();
            if (Helper.arrayEquals(usersAnswerHandIndexes, correctHandIndexes))
                this.winsNumber++;
            this.questionNumber++;
            this.updateNumbers();
        }

        private clearAnswerChecks(): void {
            $('input[name="answerCheck"]').prop('checked', false);
        }

        private updateQandA(): void {
            this.updateNextButton();
            this.updateAnswerChecks();
            this.updateNumbers();
        }

        private updateNextButton(): void {
            if (this.view.settings.isJapanese)
                $('#nextButton').val(this.isQuestion ? '次の問題' : '待ちを表示');
            else
                $('#nextButton').val(this.isQuestion ? 'Next' : 'Show winning tiles');
        }

        private updateAnswerChecks(): void {
            if (this.isQuestion) {
                $('input[name="answerCheck"]').prop('disabled', true);
                $('#answerChecksClear'       ).prop('disabled', true);
            } else {
                this.clearAnswerChecks();
                $('input[name="answerCheck"]').prop('disabled', false);
                $('#answerChecksClear'       ).prop('disabled', false);
            }
        }

        private getHandIndexes(): number[] {
            var handIndexes: number[] = [];
            for (var handIndex = 0; handIndex < 9; handIndex++) {
                if ($('#answerCheck' + String(handIndex + 1)).prop('checked'))
                    handIndexes.push(handIndex);
            }
            return handIndexes;
        }

        private updateNumbers(): void {
            $('#winsNumber'    ).text(String(this.winsNumber    ));
            $('#questionNumber').text(String(this.questionNumber));
        }

        private updateLanguage(): void {
            if (this.view.settings.isJapanese) {
                $('#title').html("麻雀 清一色の練習 | 翔ソフトウェア (Sho's)");

                $('#usingTileLabel').html('牌');
                $('label[for="usingTileCharacters"]').text('萬子');
                $('label[for="usingTileDots"]').text('筒子');
                $('label[for="usingTileBomboos"]').text('索子');

                $('#tileSizeLabel').html('牌の大きさ');
                $('label[for="tileSizeSmall"]').text('小');
                $('label[for="tileSizeMedium"]').text('中');
                $('label[for="tileSizeLarge"]').text('大');

                $('#languageLabel').html('言語 (Language)');
                $('label[for="languageEnglish"]').text('英語 (English)');
                $('label[for="languageJapanese"]').text('日本語 (Japanese)');

                $('#fontOrImageLabel').html('牌の描画方法 (表示がおかしくなるときは「画像」を推奨)');
                $('label[for="fontOrImageFont"]').text('フォント');
                $('label[for="fontOrImageImage"]').text('画像');

                $('#sortingLabel').html('理牌');
                $('label[for="sortingSorted"]').text('あり');
                $('label[for="sortingUnsorted"]').text('なし');

                $('#answerChecksClear').val('クリア');
                $('#winsNumberLabel').html('正解数');
                $('#answerPanel').html('あなたの解答');
            } else {
                $('#title').html("Mahjong Flush Practice | Sho's Software");

                $('#languageLabel').html('Language (言語)');
                $('label[for="languageEnglish"]').text('English (英語)');
                $('label[for="languageJapanese"]').text('Japanese (日本語)');

                $('#fontOrImageLabel').html('How to draw the tiles (If the display is not correct, "Images" is recommended)');
                $('label[for="fontOrImageFont"]').text('Font');
                $('label[for="fontOrImageImage"]').text('Images');

                $('#usingTileLabel').html('Tiles');
                $('label[for="usingTileCharacters"]').text('Characters');
                $('label[for="usingTileDots"]').text('Dots');
                $('label[for="usingTileBomboos"]').text('Bomboos');

                $('#tileSizeLabel').html('Tile size');
                $('label[for="tileSizeSmall"]').text('Small');
                $('label[for="tileSizeMedium"]').text('Medium');
                $('label[for="tileSizeLarge"]').text('Large');

                $('#sortingLabel').html('Sorting');
                $('label[for="sortingSorted"]').text('Sorted');
                $('label[for="sortingUnsorted"]').text('Unsorted');

                $('#answerChecksClear').val('Clear');
                $('#winsNumberLabel').html('Correct Answers');
                $('#answerPanel').html('Your Answer');
            }
            this.updateQandA();
        }
   }
}

$(document).ready(() => new Chiniisou.Application());
