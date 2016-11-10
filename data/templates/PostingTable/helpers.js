function formatDate(date) {
    if (date) {

        var d = Date.parse(date);

        d = new Date(d);

        return d.toLocaleDateString('br');
    }

    return 'n/d';
}

function formatValue(value) {
    if (value) {
        return 'R$ ' + value.toFixed(2);
    }

    return 'n/d';
}

function formatState(state) {
    switch (state) {
        case 0:
            return 'new.png';
        case 1:
            return 'play.png';
        case 2:
            return 'finish.png';
        case 3:
            return 'delete.png';
    }
}

function formatRef(value) {
    if (value) {
        return value.name;
    }

    return 'n/d';
}

function sumRealized( posting ) {
    var sum = 0;
    
    posting.map( function(p){
        sum += p.realValue || 0;
    });
    
    return 'R$ ' + sum.toFixed( 2 );
}

function sumEstimated( posting ) {
    var sum = 0;
    
    posting.map( function(p){
        sum += p.estimateValue || 0;
    });
    
    return 'R$ ' + sum.toFixed( 2 );
}

function formatBoolean(b) {
    return b ? 'Sim' : 'Não';
}