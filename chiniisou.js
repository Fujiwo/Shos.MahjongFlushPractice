"use strict";
var Chiniisou;
(function (Chiniisou) {
    var Suit;
    (function (Suit) {
        Suit[Suit["Characters"] = 0] = "Characters";
        Suit[Suit["Bomboos"] = 1] = "Bomboos";
        Suit[Suit["Dots"] = 2] = "Dots";
    })(Suit || (Suit = {}));
    var TileSize;
    (function (TileSize) {
        TileSize[TileSize["Small"] = 0] = "Small";
        TileSize[TileSize["Medium"] = 1] = "Medium";
        TileSize[TileSize["Large"] = 2] = "Large";
    })(TileSize || (TileSize = {}));
    var Helper = /** @class */ (function () {
        function Helper() {
        }
        Helper.isFromJapan = function () {
            var language = (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language;
            return language != null && language.substr(0, 2) === 'ja';
        };
        Helper.save = function (key, data) {
            if (typeof window.localStorage !== 'undefined') {
                // console.log('Helper.save()');
                // console.log(data);
                // console.log(JSON.stringify(data));
                window.localStorage.setItem(key, JSON.stringify(data));
                return true;
            }
            else {
                return false;
            }
        };
        Helper.load = function (key) {
            if (typeof window.localStorage !== 'undefined') {
                var json = window.localStorage.getItem(key);
                // console.log('Helper.load()');
                // console.log(json);
                // if (json != null)
                //     console.log(JSON.parse(json));
                return json == null ? null : JSON.parse(json);
            }
            else {
                return null;
            }
        };
        // public static removeFromStorage(key: string): boolean {
        //     if (typeof window.localStorage !== 'undefined') {
        //         window.localStorage.removeItem(key);
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
        Helper.getRandomNumber = function (minimum, maximum) {
            return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        };
        Helper.getRandomIndex = function (number) {
            return Math.floor(Math.random() * number);
        };
        Helper.getRandomElement = function (array) {
            return array[Helper.getRandomIndex(array.length)];
        };
        Helper.arrayEquals = function (array1, array2) {
            if (array1.length != array2.length)
                return false;
            for (var index = 0; index < array1.length; index++) {
                if (array1[index] !== array2[index])
                    return false;
            }
            return true;
        };
        Helper.shuffle = function (array) {
            for (var count = array.length; count > 1; count--)
                Helper.shuffleTail(array, count);
        };
        Helper.shuffleTail = function (collection, count) {
            var lastIndex = count - 1;
            var randomIndex = Helper.getRandomIndex(count);
            Helper.swap(collection, lastIndex, randomIndex);
        };
        Helper.swap = function (collection, index1, index2) {
            if (index1 == index2)
                return;
            var temporary = collection[index1];
            collection[index1] = collection[index2];
            collection[index2] = temporary;
        };
        return Helper;
    }());
    var Model = /** @class */ (function () {
        function Model() {
            this.allHands = Model.getAllHands();
            // console.log('allHands: ' + String(this.allHands.length));
            // console.log('allHands: ' + String(this.allHands));
            this.winningHands = Model.getWinningHands(this.allHands);
        }
        Model.prototype.getNewReadyToWinHand = function () {
            var winningHand = Helper.getRandomElement(this.winningHands);
            return Model.getReadyToWinHand(winningHand);
        };
        Model.makeWinningHandIndexes = function (readyToWinHand) {
            var handIndexes = [];
            for (var handIndex = 0; handIndex < Model.handIndexNumber; handIndex++) {
                var hand = Model.appendHand(readyToWinHand, handIndex);
                if (hand !== null && Model.isWinningHand(hand))
                    handIndexes.push(handIndex);
            }
            return handIndexes;
        };
        Model.shuffledHandIndexes = function (hand) {
            var handIndexes = Model.handToHandIndexes(hand);
            Helper.shuffle(handIndexes);
            return handIndexes;
        };
        Model.handToHandIndexes = function (hand) {
            var handIndexes = [];
            for (var handIndex = 0; handIndex < hand.length; handIndex++) {
                for (var index = 0; index < hand[handIndex]; index++)
                    handIndexes.push(handIndex);
            }
            return handIndexes;
        };
        // private static handIndexesToHand(handIndexes: number[]): number[] {
        //     var hand: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        //     for (var index = 0; index < handIndexes.length; index++)
        //         hand[handIndexes[index]]++;
        //     return hand;
        // }
        Model.makeHands = function (tileNumber, tileNumberSum, hand, hands) {
            var newTileNumberSum = tileNumberSum + tileNumber;
            if (hand == null)
                hand = [];
            hand.push(tileNumber);
            if (hand.length > Model.handIndexNumber || newTileNumberSum > Model.winningHandsNumber)
                return false;
            if (newTileNumberSum == Model.winningHandsNumber) {
                while (hand.length < Model.handIndexNumber)
                    hand.push(0);
                hands.push(hand);
                return true;
            }
            for (var tileNumber = 0; tileNumber <= 4; tileNumber++) {
                if (!Model.makeHands(tileNumber, newTileNumberSum, hand.concat(), hands))
                    break;
            }
            return true;
        };
        Model.getAllHands = function () {
            var hands = [];
            for (var tileNumber = 0; tileNumber <= 4; tileNumber++) {
                if (!Model.makeHands(tileNumber, 0, null, hands))
                    break;
            }
            return hands;
            // var hands = [];
            // for (var tileNumber1 = 0; tileNumber1 <= 4; tileNumber1++) {
            //     let tileNumberSum1 = tileNumber1;
            //     for (var tileNumber2 = 0; tileNumber2 <= 4; tileNumber2++) {
            //         let tileNumberSum2 = tileNumberSum1 + tileNumber2;
            //         for (var tileNumber3 = 0; tileNumber3 <= 4; tileNumber3++) {
            //             let tileNumberSum3 = tileNumberSum2 + tileNumber3;
            //             for (var tileNumber4 = 0; tileNumber4 <= 4; tileNumber4++) {
            //                 let tileNumberSum4 = tileNumberSum3 + tileNumber4;
            //                 if (tileNumberSum4 >= Model.winningHandsNumber) {
            //                     if (tileNumberSum4 == Model.winningHandsNumber)
            //                         hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, 0, 0, 0, 0, 0]);
            //                     break;
            //                 }
            //                 for (var tileNumber5 = 0; tileNumber5 <= 4; tileNumber5++) {
            //                     let tileNumberSum5 = tileNumberSum4 + tileNumber5;
            //                     if (tileNumberSum5 >= Model.winningHandsNumber) {
            //                         if (tileNumberSum5 == Model.winningHandsNumber)
            //                             hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, 0, 0, 0, 0]);
            //                         break;
            //                     }
            //                     for (var tileNumber6 = 0; tileNumber6 <= 4; tileNumber6++) {
            //                         let tileNumberSum6 = tileNumberSum5 + tileNumber6;
            //                         if (tileNumberSum6 >= Model.winningHandsNumber) {
            //                             if (tileNumberSum6 == Model.winningHandsNumber)
            //                                 hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, tileNumber6, 0, 0, 0]);
            //                             break;
            //                         }
            //                         for (var tileNumber7 = 0; tileNumber7 <= 4; tileNumber7++) {
            //                             let tileNumberSum7 = tileNumberSum6 + tileNumber7;
            //                             if (tileNumberSum7 >= Model.winningHandsNumber) {
            //                                 if (tileNumberSum7 == Model.winningHandsNumber)
            //                                     hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, tileNumber6, tileNumber7, 0, 0]);
            //                                 break;
            //                             }
            //                             for (var tileNumber8 = 0; tileNumber8 <= 4; tileNumber8++) {
            //                                 let tileNumberSum8 = tileNumberSum7 + tileNumber8;
            //                                 if (tileNumberSum8 >= Model.winningHandsNumber) {
            //                                     if (tileNumberSum8 == Model.winningHandsNumber)
            //                                         hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, tileNumber6, tileNumber7, tileNumber8, 0]);
            //                                     break;
            //                                 }
            //                                 for (var tileNumber9 = 0; tileNumber9 <= 4; tileNumber9++) {
            //                                     let tileNumberSum9 = tileNumberSum8 + tileNumber9;
            //                                     if (tileNumberSum9 >= Model.winningHandsNumber) {
            //                                         if (tileNumberSum9 == Model.winningHandsNumber)
            //                                             hands.push([tileNumber1, tileNumber2, tileNumber3, tileNumber4, tileNumber5, tileNumber6, tileNumber7, tileNumber8, tileNumber9]);
            //                                         break;
            //                                     }
            //                                 }
            //                             }
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }
            // return hands;
        };
        Model.isSevenPairs = function (hand) {
            for (var index = 0; index < hand.length; index++) {
                if (hand[index] != 0 && hand[index] != 2)
                    return false;
            }
            return true;
        };
        Model.maybeWinningHand = function (hand) {
            var a = hand[0];
            var b = hand[1];
            for (var i = 0; i < 7; i++) {
                var r = a % 3;
                if (b >= r && hand[i + 2] >= r) {
                    a = b - r;
                    b = hand[i + 2] - r;
                }
                else {
                    return false;
                }
            }
            return a % 3 == 0 && b % 3 == 0;
        };
        Model.isWinningHand = function (hand) {
            if (Model.isSevenPairs(hand))
                return true;
            var p = 0;
            for (var i = 0; i < Model.handIndexNumber; i++)
                p += i * hand[i];
            for (var i = p * 2 % 3; i < Model.handIndexNumber; i += 3) {
                hand[i] -= 2;
                if (hand[i] >= 0) {
                    if (Model.maybeWinningHand(hand)) {
                        hand[i] += 2;
                        return true;
                    }
                }
                hand[i] += 2;
            }
            return false;
        };
        Model.getWinningHands = function (allHands) {
            return allHands.filter(function (hand) { return Model.isWinningHand(hand); });
        };
        Model.decrementHand = function (hand) {
            var randomIndex = Helper.getRandomIndex(Model.winningHandsNumber);
            var index = 0;
            for (var handIndex = 0; handIndex < hand.length; handIndex++) {
                index += hand[handIndex];
                if (index > randomIndex) {
                    var clonedHand = hand.concat();
                    if (clonedHand[handIndex] == 0)
                        throw new Error('Error: decrementHand failed.');
                    else
                        clonedHand[handIndex]--;
                    return [clonedHand, handIndex];
                }
            }
            throw new Error('Error: decrementHand failed.');
        };
        Model.getReadyToWinHand = function (winningHand) {
            return Model.decrementHand(winningHand)[0];
        };
        Model.appendHand = function (hand, handIndex) {
            var clonedHand = hand.concat();
            if (clonedHand[handIndex] < 4) {
                clonedHand[handIndex]++;
                return clonedHand;
            }
            return null;
        };
        Model.winningHandsNumber = 14;
        Model.handIndexNumber = 9;
        return Model;
    }());
    var ViewSettings = /** @class */ (function () {
        function ViewSettings() {
            this._isJapanese = Helper.isFromJapan();
            this._fontOrImage = true;
            this._suit = Suit.Characters;
            this._tileSize = TileSize.Medium;
            this._isSorted = true;
        }
        Object.defineProperty(ViewSettings.prototype, "isJapanese", {
            get: function () {
                return this._isJapanese;
            },
            set: function (value) {
                if (value != this._isJapanese) {
                    this._isJapanese = value;
                    this.save();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewSettings.prototype, "fontOrImage", {
            get: function () {
                return this._fontOrImage;
            },
            set: function (value) {
                if (value != this._fontOrImage) {
                    this._fontOrImage = value;
                    this.save();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewSettings.prototype, "suit", {
            get: function () {
                return this._suit;
            },
            set: function (value) {
                if (value != this._suit) {
                    this._suit = value;
                    this.save();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewSettings.prototype, "tileSize", {
            get: function () {
                return this._tileSize;
            },
            set: function (value) {
                if (value != this._tileSize) {
                    this._tileSize = value;
                    this.save();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewSettings.prototype, "isSorted", {
            get: function () {
                return this._isSorted;
            },
            set: function (value) {
                if (value != this._isSorted) {
                    this._isSorted = value;
                    this.save();
                }
            },
            enumerable: true,
            configurable: true
        });
        // public constructor() {
        //     //Helper.removeFromStorage(ViewSettings.dataKey);
        // }
        ViewSettings.prototype.load = function () {
            var loadedData = Helper.load(ViewSettings.dataKey);
            if (loadedData == null)
                return false;
            this._isJapanese = loadedData._isJapanese;
            this._fontOrImage = loadedData._fontOrImage;
            this._suit = loadedData._suit;
            this._tileSize = loadedData._tileSize;
            this._isSorted = loadedData._isSorted;
            return true;
        };
        ViewSettings.prototype.save = function () {
            return Helper.save(ViewSettings.dataKey, this);
        };
        ViewSettings.dataKey = 'ShosChiniisouViewSettings';
        return ViewSettings;
    }());
    var View = /** @class */ (function () {
        function View() {
            this.settings_ = new ViewSettings();
            this.settings.load();
        }
        Object.defineProperty(View.prototype, "settings", {
            get: function () {
                return this.settings_;
            },
            enumerable: true,
            configurable: true
        });
        View.prototype.appendHandTo = function (element, hand) {
            var div = this.settings.isSorted ? this.handToTileHtml(hand) : this.handIndexesToHtml(Model.shuffledHandIndexes(hand));
            element.append(div);
        };
        View.prototype.appendHandIndexesTo = function (element, handIndexes) {
            var div = this.handIndexesToHtml(handIndexes);
            element.append(div);
        };
        Object.defineProperty(View.prototype, "tileStyle", {
            get: function () {
                switch (this.settings.tileSize) {
                    case TileSize.Small: return "small-tile";
                    case TileSize.Medium: return "medium-tile";
                    case TileSize.Large: return "large-tile";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "tileTexts", {
            get: function () {
                switch (this.settings.suit) {
                    case Suit.Bomboos: return View.bambooTileTexts;
                    case Suit.Dots: return View.dotsTileTexts;
                    default: return View.charactersTileTexts;
                }
            },
            enumerable: true,
            configurable: true
        });
        View.prototype.handIndexesToHtml = function (handIndexes) {
            var _this = this;
            var div = $('<div>');
            div.addClass(this.tileStyle);
            handIndexes.forEach(function (handIndex) { return div.append(_this.handIndexToHtml(handIndex)); });
            return div;
        };
        View.prototype.handToTileHtml = function (hand) {
            var _this = this;
            var div = $('<div>');
            div.addClass(this.tileStyle);
            hand.forEach(function (tileNumber, handIndex, self) {
                for (var count = 0; count < tileNumber; count++)
                    div.append(_this.handIndexToHtml(handIndex));
            });
            return div;
        };
        View.prototype.handIndexToHtml = function (handIndex) {
            return this.settings.fontOrImage ? this.toFontHtml(handIndex) : this.toImageHtml(handIndex);
        };
        View.prototype.toFontHtml = function (handIndex) {
            return $('<span>').html(this.tileTexts[handIndex]);
        };
        View.prototype.toImageHtml = function (handIndex) {
            var rate = 1.00;
            switch (this.settings.tileSize) {
                case TileSize.Small:
                    rate = 0.75;
                    break;
                case TileSize.Medium:
                    rate = 1.00;
                    break;
                case TileSize.Large:
                    rate = 1.50;
                    break;
            }
            var width = 47;
            var height = 63;
            return $('<img >').attr('src', this.getFontImageFileName(handIndex))
                .attr('width', Math.floor(width * rate))
                .attr('height', Math.floor(height * rate));
        };
        View.prototype.getFontImageFileName = function (handIndex) {
            var fileName = 'images/p_';
            switch (this.settings.suit) {
                case Suit.Characters:
                    fileName += 'm';
                    break;
                case Suit.Dots:
                    fileName += 'p';
                    break;
                case Suit.Bomboos:
                    fileName += 's';
                    break;
            }
            return fileName + 's' + String(handIndex + 1) + '_1.gif';
        };
        View.charactersTileTexts = ['&#x1f007;', '&#x1f008;', '&#x1f009;', '&#x1f00a;', '&#x1f00b;', '&#x1f00c;', '&#x1f00d;', '&#x1f00e;', '&#x1f00f;'];
        View.bambooTileTexts = ['&#x1f010;', '&#x1f011;', '&#x1f012;', '&#x1f013;', '&#x1f014;', '&#x1f015;', '&#x1f016;', '&#x1f017;', '&#x1f018;'];
        View.dotsTileTexts = ['&#x1f019;', '&#x1f01a;', '&#x1f01b;', '&#x1f01c;', '&#x1f01d;', '&#x1f01e;', '&#x1f01f;', '&#x1f020;', '&#x1f021;'];
        return View;
    }());
    var Application = /** @class */ (function () {
        function Application() {
            this.model = new Model();
            this.view = new View();
            this.isQuestion = true;
            this.readyToWinHand = [];
            this.questionNumber = 0;
            this.winsNumber = 0;
            this.initializeControls();
            this.setHandlers();
            this.setQuestion();
            this.view.settings.isJapanese ? $('input:radio[name="language"]').val(['japanese'])
                : $('input:radio[name="language"]').val(['english']);
            this.updateLanguage();
        }
        Object.defineProperty(Application.prototype, "qustionText", {
            get: function () {
                return this.view.settings.isJapanese ? '聴牌' : 'Ready to win hand';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "answerText", {
            get: function () {
                return this.view.settings.isJapanese ? '待ち' : 'Winning tiles';
            },
            enumerable: true,
            configurable: true
        });
        Application.prototype.initializeControls = function () {
            $('input:radio[name="language"]').val([this.view.settings.isJapanese ? "japanese" : "english"]);
            $('input:radio[name="fontOrImage"]').val([this.view.settings.fontOrImage ? "font" : "image"]);
            var suitValue = "";
            switch (this.view.settings.suit) {
                case Suit.Characters:
                    suitValue = "characters";
                    break;
                case Suit.Dots:
                    suitValue = "dots";
                    break;
                case Suit.Bomboos:
                    suitValue = "bomboos";
                    break;
            }
            //console.log("suitValue: " + suitValue);
            $('input:radio[name="usingTile"]').val([suitValue]);
            var tileSizeValue = "";
            switch (this.view.settings.tileSize) {
                case TileSize.Small:
                    tileSizeValue = "small";
                    break;
                case TileSize.Medium:
                    tileSizeValue = "medium";
                    break;
                case TileSize.Large:
                    tileSizeValue = "large";
                    break;
            }
            //console.log("tileSizeValue: " + tileSizeValue);
            $('input:radio[name="tileSize"]').val([tileSizeValue]);
            $('input:radio[name="sorting"]').val([this.view.settings.isSorted ? "sorted" : "unsorted"]);
        };
        Application.prototype.setHandlers = function () {
            var _this = this;
            $('input:radio[name="language"]').change(function () {
                var value = $('input:radio[name="language"]:checked').val();
                switch (value) {
                    case "japanese":
                        _this.view.settings.isJapanese = true;
                        break;
                    case "english":
                        _this.view.settings.isJapanese = false;
                        break;
                }
                _this.updateLanguage();
            });
            $('input:radio[name="fontOrImage"]').change(function () {
                var value = $('input:radio[name="fontOrImage"]:checked').val();
                switch (value) {
                    case "font":
                        _this.view.settings.fontOrImage = true;
                        break;
                    case "image":
                        _this.view.settings.fontOrImage = false;
                        break;
                }
            });
            $('input:radio[name="usingTile"]').change(function () {
                var value = $('input:radio[name="usingTile"]:checked').val();
                switch (value) {
                    case "characters":
                        _this.view.settings.suit = Suit.Characters;
                        break;
                    case "dots":
                        _this.view.settings.suit = Suit.Dots;
                        break;
                    case "bomboos":
                        _this.view.settings.suit = Suit.Bomboos;
                        break;
                }
            });
            $('input:radio[name="tileSize"]').change(function () {
                var value = $('input:radio[name="tileSize"]:checked').val();
                switch (value) {
                    case "small":
                        _this.view.settings.tileSize = TileSize.Small;
                        break;
                    case "medium":
                        _this.view.settings.tileSize = TileSize.Medium;
                        break;
                    case "large":
                        _this.view.settings.tileSize = TileSize.Large;
                        break;
                }
            });
            $('input:radio[name="sorting"]').change(function () {
                var value = $('input:radio[name="sorting"]:checked').val();
                switch (value) {
                    case "sorted":
                        _this.view.settings.isSorted = true;
                        break;
                    case "unsorted":
                        _this.view.settings.isSorted = false;
                        break;
                }
            });
            $('#nextButton').on('click', function () {
                _this.isQuestion ? _this.setQuestion()
                    : _this.setAnswer();
                _this.updateQandA();
            });
            $('#answerChecksClear').on('click', function () {
                _this.clearAnswerChecks();
            });
        };
        Application.prototype.setQuestion = function () {
            this.readyToWinHand = this.model.getNewReadyToWinHand();
            $("#hands").html("");
            $("#hands").append('<div>' + this.qustionText + ':</div>');
            this.view.appendHandTo($("#hands"), this.readyToWinHand);
            this.isQuestion = false;
        };
        Application.prototype.setAnswer = function () {
            var handIndexes = Model.makeWinningHandIndexes(this.readyToWinHand);
            $("#hands").append('<div>' + this.answerText + ':</div>');
            this.view.appendHandIndexesTo($("#hands"), handIndexes);
            this.isQuestion = true;
            this.judge(handIndexes);
        };
        Application.prototype.judge = function (correctHandIndexes) {
            var usersAnswerHandIndexes = this.getHandIndexes();
            if (Helper.arrayEquals(usersAnswerHandIndexes, correctHandIndexes))
                this.winsNumber++;
            this.questionNumber++;
            this.updateNumbers();
        };
        Application.prototype.clearAnswerChecks = function () {
            $('input[name="answerCheck"]').prop('checked', false);
        };
        Application.prototype.updateQandA = function () {
            this.updateNextButton();
            this.updateAnswerChecks();
            this.updateNumbers();
        };
        Application.prototype.updateNextButton = function () {
            if (this.view.settings.isJapanese)
                $('#nextButton').val(this.isQuestion ? '次の問題' : '待ちを表示');
            else
                $('#nextButton').val(this.isQuestion ? 'Next' : 'Show winning tiles');
        };
        Application.prototype.updateAnswerChecks = function () {
            if (this.isQuestion) {
                $('input[name="answerCheck"]').prop('disabled', true);
                $('#answerChecksClear').prop('disabled', true);
            }
            else {
                this.clearAnswerChecks();
                $('input[name="answerCheck"]').prop('disabled', false);
                $('#answerChecksClear').prop('disabled', false);
            }
        };
        Application.prototype.getHandIndexes = function () {
            var handIndexes = [];
            for (var handIndex = 0; handIndex < Model.handIndexNumber; handIndex++) {
                if ($('#answerCheck' + String(handIndex + 1)).prop('checked'))
                    handIndexes.push(handIndex);
            }
            return handIndexes;
        };
        Application.prototype.updateNumbers = function () {
            $('#winsNumber').text(String(this.winsNumber));
            $('#questionNumber').text(String(this.questionNumber));
        };
        Application.prototype.updateLanguage = function () {
            var isJapanese = this.view.settings.isJapanese;
            //     $('#title').html();
            $('#title').html(isJapanese ? "麻雀 清一色の練習 | 翔ソフトウェア (Sho's)" : "Mahjong Flush Practice | Sho's Software");
            $('#languageLabel').html(isJapanese ? '言語 (Language)' : 'Language (言語)');
            $('label[for="languageEnglish"]').text(isJapanese ? '英語 (English)' : 'English (英語)');
            $('label[for="languageJapanese"]').text(isJapanese ? '日本語 (Japanese)' : 'Japanese (日本語)');
            $('#fontOrImageLabel').html(isJapanese ? '牌の描画方法 (表示がおかしいときは「画像」を選択)' : 'How to draw the tiles (If the display is not correct, choose "Images.")');
            $('label[for="fontOrImageFont"]').text(isJapanese ? 'フォント' : 'Font');
            $('label[for="fontOrImageImage"]').text(isJapanese ? '画像' : 'Images');
            $('#usingTileLabel').html(isJapanese ? '牌' : 'Tiles');
            $('label[for="usingTileCharacters"]').text(isJapanese ? '萬子' : 'Characters');
            $('label[for="usingTileDots"]').text(isJapanese ? '筒子' : 'Dots');
            $('label[for="usingTileBomboos"]').text(isJapanese ? '索子' : 'Bomboos');
            $('#tileSizeLabel').html(isJapanese ? '牌の大きさ' : 'Tile size');
            $('label[for="tileSizeSmall"]').text(isJapanese ? '小' : 'Small');
            $('label[for="tileSizeMedium"]').text(isJapanese ? '中' : 'Medium');
            $('label[for="tileSizeLarge"]').text(isJapanese ? '大' : 'Large');
            $('#sortingLabel').html(isJapanese ? '理牌' : 'Sorting');
            $('label[for="sortingSorted"]').text(isJapanese ? 'あり' : 'Sorted');
            $('label[for="sortingUnsorted"]').text(isJapanese ? 'なし' : 'Unsorted');
            $('#answerChecksClear').val(isJapanese ? 'クリア' : 'Clear');
            $('#winsNumberLabel').html(isJapanese ? '正解数' : 'Correct Answers');
            $('#answerPanel').html(isJapanese ? '何待ち?' : 'Winning tiles?');
            // if (this.view.settings.isJapanese) {
            //     $('#title').html("麻雀 清一色の練習 | 翔ソフトウェア (Sho's)");
            //     $('#usingTileLabel').html('牌');
            //     $('label[for="usingTileCharacters"]').text('萬子');
            //     $('label[for="usingTileDots"]').text('筒子');
            //     $('label[for="usingTileBomboos"]').text('索子');
            //     $('#tileSizeLabel').html('牌の大きさ');
            //     $('label[for="tileSizeSmall"]').text('小');
            //     $('label[for="tileSizeMedium"]').text('中');
            //     $('label[for="tileSizeLarge"]').text('大');
            //     $('#languageLabel').html('言語 (Language)');
            //     $('label[for="languageEnglish"]').text('英語 (English)');
            //     $('label[for="languageJapanese"]').text('日本語 (Japanese)');
            //     $('#fontOrImageLabel').html('牌の描画方法 (表示がおかしいときは「画像」を選択)');
            //     $('label[for="fontOrImageFont"]').text('フォント');
            //     $('label[for="fontOrImageImage"]').text('画像');
            //     $('#sortingLabel').html('理牌');
            //     $('label[for="sortingSorted"]').text('あり');
            //     $('label[for="sortingUnsorted"]').text('なし');
            //     $('#answerChecksClear').val('クリア');
            //     $('#winsNumberLabel').html('正解数');
            //     $('#answerPanel').html('何待ち?');
            // } else {
            //     $('#title').html("Mahjong Flush Practice | Sho's Software");
            //     $('#languageLabel').html('Language (言語)');
            //     $('label[for="languageEnglish"]').text('English (英語)');
            //     $('label[for="languageJapanese"]').text('Japanese (日本語)');
            //     $('#fontOrImageLabel').html('How to draw the tiles (If the display is not correct, choose "Images.")');
            //     $('label[for="fontOrImageFont"]').text('Font');
            //     $('label[for="fontOrImageImage"]').text('Images');
            //     $('#usingTileLabel').html('Tiles');
            //     $('label[for="usingTileCharacters"]').text('Characters');
            //     $('label[for="usingTileDots"]').text('Dots');
            //     $('label[for="usingTileBomboos"]').text('Bomboos');
            //     $('#tileSizeLabel').html('Tile size');
            //     $('label[for="tileSizeSmall"]').text('Small');
            //     $('label[for="tileSizeMedium"]').text('Medium');
            //     $('label[for="tileSizeLarge"]').text('Large');
            //     $('#sortingLabel').html('Sorting');
            //     $('label[for="sortingSorted"]').text('Sorted');
            //     $('label[for="sortingUnsorted"]').text('Unsorted');
            //     $('#answerChecksClear').val('Clear');
            //     $('#winsNumberLabel').html('Correct Answers');
            //     $('#answerPanel').html('Winning tiles?');
            // }
            this.updateQandA();
        };
        return Application;
    }());
    Chiniisou.Application = Application;
})(Chiniisou || (Chiniisou = {}));
$(document).ready(function () { return new Chiniisou.Application(); });
//# sourceMappingURL=chiniisou.js.map