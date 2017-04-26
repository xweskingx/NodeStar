class Dense(object):

    def __init__(self, x, y, dtype=tf.float32, in_dims=None, out_dims=10, out_func=None):
        self.x        = x
        self.y        = y
        self.dtype    = dtype
        self.in_dims  = in_dims
        self.out_dims = out_dims
        self.out_func = out_func

        self.prediction
        self.optimize
        self.error


    @lazy_prop
    def prediction(self):
        return tf.contrib.slim.fully_connected(self.x, self.out_dims)

    @lazy_prop
    def optimize(self):
        log   = tf.log(self.prediction + 1e-12)
        cross = -tf.reduce_sum(self.y * log)
        return tf.train.RMSPropOptimizer(0.03).minimize(cross)

    @lazy_prop
    def error(self):
        miss = tf.not_equal(tf.argmax(self.y, 1), tf.argmax(self.prediction, 1))
        return tf.reduce_mean(tf.cast(miss, self.dtype))

def main():
    x = tf.placeholder(tf.float32, [None, INPUT_DIMS])
    y = tf.placeholder(tf.float32, [None, OUTPUT_DIMS])

    net = Dense(x, y, in_dims=INPUT_DIMS, out_dims=OUTPUT_DIMS)

    mnist_out(1000, 100, net)

