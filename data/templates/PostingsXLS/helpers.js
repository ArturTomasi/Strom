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
        return value.toFixed(2);
    }

    return 'n/d';
}

function formatState(state) {
    switch (state) {
        case 0:
            return 'Cadastrado';
        case 1:
            return 'Em Andamento';
        case 2:
            return 'Finalizado';
        case 3:
            return 'Excluído';
    }
}

function formatRef(value) {
    if (value) {
        return value.name;
    }

    return 'n/d';
}
